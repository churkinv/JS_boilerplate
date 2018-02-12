import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

describe('My first test', () => {
  it('should pass', () => {
    expect(true).to.equal(true);
  });
});

describe('index.html', () => {
  it ('should say RoomGame', (done) => { // test should be asynchronius so we pass done as parameter
    const index = fs.readFileSync('./src/index.html', "utf-8");
    jsdom.env(index, function(err, window){ // callback! note to remember
      const h1 = window.document.getElementsByTagName('h1')[0];
      expect(h1.innerHTML).to.equal("RoomGame");
      done();
      window.close();
    });
  });
});