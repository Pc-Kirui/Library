//Array to store book objects

const myLibrary = [];

//The constructor for books

function Book(title, author, pages, status, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.id = crypto.randomUUID();
}

function capitalizeWords(str) {
  return str
    .trim()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

//Function that takes params, create a book then store it in the array

function addBookToLibrary() {
  const myForm = document.getElementById("book-form");

  myForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = capitalizeWords(e.target.title.value);
    const author = capitalizeWords(e.target.author.value);
    const pages = e.target.pages.value;
    const status = e.target.status.value;

    const newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook);

    displayBook();

    e.target.reset();
  });
}

//function that loops through the array and display each book on the page

function displayBook() {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  myLibrary.forEach(function (book, index) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${index + 1}</td> <td>${book.title}</td> <td>${
      book.author
    }</td> <td>${book.pages}</td> <td>${
      book.status === "Read" ? "✅" : "❌"
    }</td>
    <td>
    <button class="delete-book" data-id="${
      book.id
    }"><i class="fa-sharp fa-solid fa-trash" style="color: #e66565;"></i></button>
    </td>
    <td><button class="toggle-status" data-id="${
      book.id
    }"><i class="fa-solid fa-toggle-off" style="color: #d5d2c8;"></i></button></td>`;

    tableBody.appendChild(row);
  });

  // Event listeners for deleting/updating status
  const delButtons = document.querySelectorAll(".delete-book");
  delButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const bookId = button.dataset.id;
      console.log(bookId);
      deleteBook(bookId);
    });
  });

  //Toggling book status
  const toggleButtons = document.querySelectorAll(".toggle-status");
  toggleButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const bookId = button.dataset.id;
      toggleStatus(bookId);
    });
  });

  updateBookCounts();
}

//Function to delete book by id
function deleteBook(bookId) {
  const index = myLibrary.findIndex((b) => b.id === bookId);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBook();
  }
}

//Toggle read/Unread status
function toggleStatus(bookId) {
  const book = myLibrary.find((b) => b.id === bookId);
  if (book) {
    book.status = book.status === "Read" ? "Unread" : "Read";
    displayBook();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  addBookToLibrary();
});

//Updating Book Count
function updateBookCounts() {
  const total = myLibrary.length;
  const read = myLibrary.filter((b) => b.status === "Read").length;
  const unread = total - read;

  const spans = document.querySelectorAll(".books-count span");
  spans[0].textContent = total;
  spans[1].textContent = read;
  spans[2].textContent = unread;
}
