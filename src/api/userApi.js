// We are using Fetch . Server: repository pattern abstracts away database
// This centralized API Proxy: abstracts away HTTP API
// This code will run on browser is not supporting fetch natively
import getBaseUrl from './baseUrl';
import 'whatwg-fetch';

const baseUrl = getBaseUrl();

/**
 * function to get users using fetch
 */
export function getUsers() {
  return get('users');
}

export function deleteUser(id) {
  return del (`users/${id}`);
}

/**
 * our private fetch function
 */
function get(url) {
  return fetch(baseUrl + url).then(onSuccess, onError);
}

/**
 * delete function, the word delete is reserved
 */
function del(url) {
  const request = new Request(baseUrl + url, {
    method: 'DELETE'
  });

  return fetch (request).then(onSuccess, onError);
}

function onSuccess(response) {
  return response.json();
}

function onError(error) {
  console.log(error); // eslint-disable-line no-console
}
