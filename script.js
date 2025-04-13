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

//Function that takes params, create a book then store it in the array

function addBookToLibrary(title, author, pages, status) {
  const newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
}

//function that loops through the array and display each book on the page

function displayBook() {
  myLibrary.forEach(function (book) {
    console.log(
      `${book.title} by ${book.author}, ${book.pages}, ${book.status}`
    );
  });
}

addBookToLibrary("The Hobbit", "J.R.R Tolkien", "295 pages", "not read");
addBookToLibrary("The Prince", "Nicollo Machiavelli", "145 pages", "read");
addBookToLibrary(
  "The Communist Manifesto",
  "Karl Marx & Friedrich Engels",
  "100 pages",
  "read"
);

displayBook();
