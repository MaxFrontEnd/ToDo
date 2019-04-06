import data from "./requests";
data
  .then(function(text) {
    console.log(text);
  })
  .catch(function(error) {
    console.log(error);
  });
function addTask() {
  var list = document.querySelector(".list");
}
