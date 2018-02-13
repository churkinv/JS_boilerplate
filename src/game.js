import { PIXI } from 'pixi.js';
//import {asciiKeyCodeNumber} from 'pixi.js';

alert('check');

let type = "WebGL"
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas"
}
PIXI.utils.sayHello(type)

let keyObject = keyboard();
let ninja;
let knight;
let bStage;
let state;

//Aliases to simplify typing
let Application = PIXI.Application,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite;

PIXI.utils.sayHello(type)
//Create a Pixi Application
//let app = new PIXI.Application({ width: 500, height: 500 });
let app = new Application({
  width: 256,         // default: 800
  height: 256,        // default: 600
  antialias: true,    // default: false
  transparent: false, // default: false
  resolution: 1       // default: 1
}
);
app.renderer.backgroundColor = 0x33CCFFAA; // to change the color of our square
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);


// let texture = PIXI.utils.TextureCache["assets/Ninja.png"];
// let sprite = new PIXI.Sprite(texture);

// Pixi’s development team recommends that if you use the loader, you should create the sprite
// by referencing the texture in the loader’s resources object, like function on line 62
PIXI.loader
  .add("images/Ninja.png") // You can load multiple images at the same time by listing them with chainable add methods, like this:
  .add("images/Knight.png")
  .add("images/bStage.jpg")
  .add("./src/images/FTUE_hand_icon.png")
  // add(name, url, optionObject, callbackFunction) // The loader's chainable add method takes 4 basic arguments
  //.on("progress", loadProgressHandler) //Pixi's loader has a special progress event that will call a customizable function that
  // will run each time a file loads. progress events are called by the loader's on method
  // see line 60
  .load(setup);
//or like this, using array
//             PIXI.loader
//   .add([
//     "images/imageOne.png",
//     "images/imageTwo.png",
//     "images/imageThree.png"
//   ])
//   .load(setup);

function setup() {  //This code will run when the loader has finished loading the image
  ninja = new PIXI.Sprite(PIXI.loader.resources["images/Ninja.png"].texture); // this is is sprite
  knight = new PIXI.Sprite(PIXI.loader.resources["images/Knight.png"].texture); // this is sprite
  bStage = new PIXI.Sprite(PIXI.loader.resources["images/bStage.jpg"].texture);

  bStage.scale.set(3.2, 2.2); // to scale x,y 1=100% or you can use as follows:
  //bStage.scale.x =3.2;
  //bStage.scale.y =3.2;

  // but eisier is to make it invisible
  // knight.visible = false;
  knight.anchor.set(0.5);
  ninja.anchor.set(0.5);
  //bStage.anchor.set(0.5);
  //Change the sprite's position
  knight.x = 700;
  knight.y = 700;
  knight.vx = 0;
  knight.vy = 0;

  ninja.x = 1500;
  ninja.y = 700;
  ninja.vx = 0;
  ninja.vy = 0;

  // Opt-in to interactivity
  ninja.interactive = true;

  // Shows hand cursor
  ninja.buttonMode = true;

  // Pointers normalize touch and mouse
  ninja.on('pointerdown', onClick);

  //adding elements to the stage so they are visible
  app.stage.addChild(bStage);
  app.stage.addChild(ninja);
  app.stage.addChild(knight);

  //to remove sprite
  //app.stage.removeChild(anySprite)


  //Set the game state
  state = play;

  //Start the game loop by adding the `gameLoop` function to
  //Pixi's `ticker` and providing it with a `delta` argument.
  app.ticker.add(delta => gameLoop(delta));
  //ninja.rotation += 0.1; // will rotate sprite relatively to anchor

  //Capture the keyboard arrow keys
  let left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);

  let leftA = keyboard(65),
    upW = keyboard(87),
    rightD = keyboard(68),
    downS = keyboard(83);


  //keys for ninja
  //Left arrow key `press` method
  left.press = () => {
    //Change the ninja's velocity when the key is pressed
    ninja.vx = -5;
    ninja.vy = 0;
  };

  //Left arrow key `release` method
  left.release = () => {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the ninja isn't moving vertically:
    //Stop the ninja
    if (!right.isDown && ninja.vy === 0) {
      ninja.vx = 0;
    }
  };

  //Up
  up.press = () => {
    ninja.vy = -5;
    ninja.vx = 0;
  };
  up.release = () => {
    if (!down.isDown && ninja.vx === 0) {
      ninja.vy = 0;
    }
  };
  //Right
  right.press = () => {
    ninja.vx = 5;
    ninja.vy = 0;
  };
  right.release = () => {
    if (!left.isDown && ninja.vy === 0) {
      ninja.vx = 0;
    }
  };

  //Down
  down.press = () => {
    ninja.vy = 5;
    ninja.vx = 0;
  };
  down.release = () => {
    if (!up.isDown && ninja.vx === 0) {
      ninja.vy = 0;
    }
  };


  //knight`s movement
  //Up
  upW.press = () => {
    knight.vy = -5;
    knight.vx = 0;
  };
  upW.release = () => {
    if (!downS.isDown && knight.vx === 0) {
      knight.vy = 0;
    }
  };
  //Down
  downS.press = () => {
    knight.vy = 5;
    knight.vx = 0;
  };
  downS.release = () => {
    if (!upW.isDown && knight.vx === 0) {
      knight.vy = 0;
    }
  };

  leftA.press = () => {
    //Change the knight's velocity when the key is pressed
    knight.vx = -5;
    knight.vy = 0;
  };

  //Left arrow key `release` method
  leftA.release = () => {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the ninja isn't moving vertically:
    //Stop the ninja
    if (!rightD.isDown && knight.vy === 0) {
      knight.vx = 0;
    }
  };

  rightD.press = () => {
    knight.vx = 500;
    knight.vy = 0;
  };
  rightD.release = () => {
    if (!leftA.isDown && knight.vy === 0) {
      knight.vx = 0;
    }
  };
}

function gameLoop(delta) {

  // //Update the ninja's velocity
  // knight.vx = 2;
  // knight.vy = 1;

  // ninja.vx = 2.5;
  // ninja.vy = 2;

  // //Move the objects by 1 pixel
  // knight.x += knight.vx;
  // knight.y -= knight.vy;
  // ninja.x -= ninja.vx;

  // It is recomended to use this structure
  // Update the current game state:

  state(delta);
}

function play(delta) {

  //Use the ninja's velocity to make it move
  ninja.x += ninja.vx;
  ninja.y += ninja.vy

  //Use the knight's velocity to make it move
  knight.x += knight.vx;
  knight.y += knight.vy

  //check for a collision between the
  // if (hitTestRectangle(ninja, knight)) {

  //     //if there's a collision, change the message text
  //     //and tint the box red
  //     message.text = "hit!";
  //     //box.tint = 0xff3300;

  // } else {

  //     //if there's no collision, reset the message
  //     //text and the box's color
  //     message.text = "No collision...";
  //     //box.tint = 0xccff99;
  // }

}


// keyboard
function keyboard(keyCode) {
  let key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

function onClick(myObject) {
  myObject.scale.x *= 1.25;
  myObject.scale.y *= 1.25;
}