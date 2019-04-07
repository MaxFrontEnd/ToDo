var removeDatafromJson = function(URL) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", URL);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 201) {
        console.log(XMLHttpRequest.DONE);
        console.log(xhr.status);
        resolve("item deleted");
      } else {
        xhr.onerror = function(err) {
          reject(err);
        };
      }
      xhr.onerror = function(err) {
        console.log(err);
      };
    };
    xhr.send();
  });
};
export default removeDatafromJson;
