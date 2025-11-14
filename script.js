// Modifying plain constructor to a class
class Book {
  constructor(title, author, pages, status, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = crypto.randomUUID();
  }
}

class Library {
  constructor(
    tableBodySelector = "#table-body",
    countsSelector = ".books-count"
  ) {
    this.books = [];
    this.tableBody = document.querySelector(tableBodySelector);
    this.countsContainer = document.querySelector(countsSelector);
    this._setupEventDelegation();
  }

  add(book) {
    this.books.push(book);
    this.render();
  }

  deleteById(id) {
    this.books = this.books.filter((b) => b.id !== id);
    this.render();
  }

  toggleStatus(id) {
    const b = this.books.find((x) => x.id === id);
    if (b) {
      b.status = b.status === "Read" ? "Unread" : "Read";
      this.render();
    }
  }

  render() {
    if (!this.tableBody) return;
    this.tableBody.innerHTML = "";

    this.books.forEach((book, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${index + 1}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.status === "Read" ? "✅" : "❌"}</td>
      <td><button class="delete-book" data-id="${
        book.id
      }" title="Delete Book"><i class="fa-sharp fa-solid fa-trash" style="color: #e66565;"></i></button></td>
      <td><button class="toggle-status" data-id="${
        book.id
      }" title="Toggle status"><i class="fa-solid fa-toggle-off" style="color: #d5d2c8;"></i></button></td>`;
      this.tableBody.appendChild(row);
    });

    this.updateCounts();
  }

  updateCounts() {
    const total = this.books.length;
    const read = this.books.filter((b) => b.status === "Read").length;
    const unread = total - read;
    if (!this.countsContainer) return;
    const spans = this.countsContainer.querySelectorAll("span");
    if (spans.length >= 3) {
      spans[0].textContent = total;
      spans[1].textContent = read;
      spans[2].textContent = unread;
    }
  }

  _setupEventDelegation() {
    if (!this.tableBody) return;

    this.tableBody.addEventListener("click", (e) => {
      const deleteBtn = e.target.closest(".delete-book");
      if (deleteBtn) {
        const id = deleteBtn.dataset.id;
        this.deleteById(id);
        return;
      }

      const toggleBtn = e.target.closest(".toggle-status");
      if (toggleBtn) {
        const id = toggleBtn.dataset.id;
        this.toggleStatus(id);
        return;
      }
    });
  }
}

const library = new Library("#table-body", ".books-count");

function capitalizeWords(str) {
  return str
    .trim()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function handleFormSubmit(e) {
  e.preventDefault();
  const title = capitalizeWords(e.target.title.value);
  const author = capitalizeWords(e.target.author.value);
  const pages = e.target.pages.value;
  const status = e.target.status.value;

  if (!title || !author) {
    alert("Please provide the title and author.");
    return;
  }

  const newBook = new Book(title, author, pages, status);
  library.add(newBook);
  e.target.reset();
}

document.addEventListener("DOMContentLoaded", () => {
  const myForm = document.getElementById("book-form");
  if (myForm) myForm.addEventListener("submit", handleFormSubmit);
});
