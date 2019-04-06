// get data from Json-server function
const URL = "http://localhost:3000/todos";

var getDataFromJson = function(URL) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", URL);
    xhr.onload = function(e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.statusText);
        }
      }
      xhr.onerror = function(e) {
        console.log(xhr.statusText);
      };
    };
    xhr.send();
  });
};

var data = getDataFromJson(URL);

export default data;
