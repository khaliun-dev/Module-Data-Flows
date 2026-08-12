let myLibrary = [];

window.addEventListener("load", function (e) {
  populateStorage();
  render();
});

function populateStorage() {
  if (myLibrary.length == 0) {
    const book1 = new Book("Robison Crusoe", "Daniel Defoe", 252, true);

    const book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      127,
      true
    );

    myLibrary.push(book1);
    myLibrary.push(book2);
  }
}

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("check");
  

function addBook() {
  if (
    titleInput.value == "" ||
    authorInput.value == "" ||
    pagesInput.value == ""
  ) {
    alert("Please fill all fields!");
    return false;
  }

  const book = new Book(
    titleInput.value,
    authorInput.value,
    Number(pagesInput.value),
    readInput.checked
  );

  myLibrary.push(book);

  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readInput.checked = false;

  render();
}
function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  const table = document.getElementById("display");
  const rowsNumber = table.rows.length;

 
  for (let n = rowsNumber - 1; n > 0; n--) {
    table.deleteRow(n);
  }

  
  const length = myLibrary.length;

  for (let i = 0; i < length; i++) {
    const row = table.insertRow(1);

    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const wasReadCell = row.insertCell(3);
    const deleteCell = row.insertCell(4);

    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pagesCell.textContent = myLibrary[i].pages;
    
    const changeBut = document.createElement("button");

    changeBut.className = "btn btn-success";

    wasReadCell.appendChild(changeBut);

    const readStatus = myLibrary[i].check ? "Yes" : "No";

    changeBut.innerText = readStatus;

    changeBut.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });


    const delButton = document.createElement("button");

    delButton.className = "btn btn-warning";
    delButton.innerHTML = "Delete";

    deleteCell.appendChild(delButton);

    delButton.addEventListener("click", function () {
      alert(`You've deleted title: ${myLibrary[i].title}`);
      myLibrary.splice(i, 1);
      render();
    });
  }
}
