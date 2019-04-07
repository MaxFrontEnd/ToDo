var setDataToJson = function(URL, data) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", URL);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 201) {
        console.log(XMLHttpRequest.DONE);
        console.log(xhr.status);
        resolve("new item added");
      } else {
        xhr.onerror = function(err) {
          reject(err);
        };
      }
      xhr.onerror = function(err) {
        console.log(err);
      };
    };
    xhr.send(JSON.stringify(data));
  });
};
export default setDataToJson;
