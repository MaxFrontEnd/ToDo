const URL = "http://localhost:3000/todos";
import data from "./readFromJsonServer";
import sendData from "./addToJsonServer";
import deleteData from "./removeFromJsonServer";

// Ad a new list item
function addLi(arrOfElements) {
  var list = document.querySelector(".list");
  arrOfElements.forEach(function(value, index) {
    // List element
    var element = document.createElement("li");
    var deleteButton = document.createElement("button");
    element.classList = "li";
    element.id = arrOfElements[index].id;
    element.innerHTML = arrOfElements[index].title;
    element.appendChild(deleteButton);
    element.onclick = function() {
      element.classList.contains("li-done")
        ? element.classList.remove("li-done")
        : (element.classList = "li-done");
    };
    //Button element
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function() {
      console.log(this.parentNode.id);
      removeFromList(this.parentNode.id);
      var li = this.parentNode;
      li.remove();
    };
    deleteButton.classList = "list-button";

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

document.addEventListener("DOMContentLoaded", displayTasks(data));

//Add new toDo button
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
