const URL = "http://localhost:3000/todos";
import data from "./requests";
import sendData from "./updateJsonServer";
import deleteData from "./removeFromList";

// Ad a new list item
function addLi(arrOfElements) {
  var list = document.querySelector(".list");
  arrOfElements.forEach(function(value, index) {
    var element = document.createElement("li");
    element.classList = "li";
    element.id = arrOfElements[index].id;
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function() {
      console.log(this.parentNode.id);
      removeFromList(this.parentNode.id);
      var li = this.parentNode;
      li.remove();
    };
    deleteButton.classList = "list-button";
    element.innerHTML = arrOfElements[index].title;
    element.appendChild(deleteButton);
    list.appendChild(element);
  });
}

// Remove from li from list
function removeFromList(id) {
  var combineURL = URL + "/" + id;
  deleteData(combineURL);
}
//Get data from server and display it
function displayTasks(data) {
  data
    .then(function(fullResponse) {
      addLi(JSON.parse(fullResponse));
      //console.log(resp);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function checkToDo() {}
document.addEventListener("DOMContentLoaded", displayTasks(data));

var addButton = document.querySelector(".button");
addButton.onclick = function ClickOnButton() {
  var inputText = document.querySelector(".input").value;
  var obj = { title: inputText, isDone: false };
  sendData(URL, obj).then(function(text) {
    console.log(text);
    //reload a page after new element li was added
    document.location.reload(true);
  });
};
