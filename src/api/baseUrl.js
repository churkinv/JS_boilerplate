export default function getBaseUrl() {
  return getQueryStringParameterByName('useMockApi') ? 'http://localhost:8081/' : '/'; //if useMockApi string exists it will use local host otherwise the address hosted by express //'https://mysterious-dawn-16770.herokuapp.com/'
} // to use useMockApi add to address in browser: ?useMockApi=true => final result will be like this http://localhost:8080/?useMockApi=true , so we easily swithcing between production build and mock

function getQueryStringParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}