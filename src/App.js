const URL = "http://localhost:3000/todos";
import data from "./readFromJsonServer";
import sendData from "./addToJsonServer";
import deleteData from "./removeFromJsonServer";

var Li = function(id, title) {
  [this.id = id, this.title = title] = [id, title];
  var blokForElement = document.createElement("div");
  blokForElement.className = "block-for-element";
  var element = document.createElement("li");
  blokForElement.id = this.id;
  element.innerHTML = this.title;
  element.classList = "li";
  element.onclick = function() {
    element.classList.contains("li-done")
      ? element.classList.replace("li-done", "li")
      : element.classList.replace("li", "li-done");
  };
  // button add to every list
  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Удалить";
  deleteButton.onclick = function() {
    console.log(this.parentNode.id);
    removeFromList(this.parentNode.id);
    var list = this.parentNode;
    list.remove();
  };
  deleteButton.classList = "list-button";
  blokForElement.appendChild(element);
  blokForElement.appendChild(deleteButton);
  return blokForElement;
};

Li.prototype.addButton = function() {};
// Ad a new list item
function addLi(arrOfElements) {
  var ol = document.querySelector(".list");
  arrOfElements.forEach(function(value, index) {
    // List element destructurning
    var [id, title] = [arrOfElements[index].id, arrOfElements[index].title];
    var li = new Li(id, title);
    //console.log(li);
    ol.appendChild(li);
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
  if (inputText) {
    sendData(URL, obj).then(function(text) {
      console.log(text);
      //reload a page after new element li was added
      document.location.reload(true);
    });
  } else {
    console.log("You need to enter something");
  }
};
