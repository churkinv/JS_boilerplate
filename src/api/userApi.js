// We are using Fetch . Server: repository pattern abstracts away database
// This centralized API Proxy: abstracts away HTTP API
// This code will run on browser is not supporting fetch natively

import 'whatwg-fetch';

/**
 * function to get users using fetch
 */
export function getUsers() {
  return get ('users');
}

/**
 * our private fetch function
 */
function get (url) {
  return fetch(url).then(onSuccess, onError);
}

function onSuccess(response) {
  return response.json();
}


function onError(error) {
  console.log(error); // eslint-disable-line no-console
}
