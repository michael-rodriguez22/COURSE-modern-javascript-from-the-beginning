// Book Constructor
function Book(title, author, isbn) {
  this.title = title
  this.author = author
  this.isbn = isbn
}

// UI Constructor
function UI() {}

// Add to list
UI.prototype.addBookToList = function (book) {
  console.log(book)
  const list = document.getElementById("book-list")
  // create tr element
  const row = document.createElement("tr")
  // insert columns
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `
  // add row to list
  list.appendChild(row)
}

// Show alert
UI.prototype.showAlert = function (message, className) {
  // Create div
  const div = document.createElement("div")
  div.className = `alert ${className}`
  div.appendChild(document.createTextNode(message))

  // Insert to DOM
  const container = document.querySelector(".container")
  const form = document.querySelector("#book-form")
  container.insertBefore(div, form)

  // Remove after 3 seconds
  setTimeout(() => document.querySelector(".alert").remove(), 3000)
}

// Clear fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = ""
  document.getElementById("author").value = ""
  document.getElementById("isbn").value = ""
}

// Delete book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") target.parentElement.parentElement.remove()
}

// Local Storage
function Store() {}

// Get Books
Store.prototype.getBooks = function () {
  let books
  localStorage.getItem("book-list-books") === null
    ? (books = [])
    : (books = JSON.parse(localStorage.getItem("book-list-books")))

  return books
}

// Display Books
Store.prototype.displayBooks = function () {
  const store = new Store()
  const ui = new UI()
  const books = store.getBooks()
  return books.forEach(book => ui.addBookToList(book))
}

// Add Book
Store.prototype.addBook = function (book) {
  const store = new Store()
  const books = store.getBooks()
  books.push(book)

  return localStorage.setItem("book-list-books", JSON.stringify(books))
}

// Delete Book
Store.prototype.deleteBook = function (isbn) {
  const store = new Store()
  const books = store.getBooks()
  books.forEach((book, index) => {
    if (book.isbn === isbn) books.splice(index, 1)
  })

  return localStorage.setItem("book-list-books", JSON.stringify(books))
}

// Event Listeners
// display books
document.addEventListener("DOMContentLoaded", () => {
  const store = new Store()
  return store.displayBooks()
})

// add book
document.getElementById("book-form").addEventListener("submit", e => {
  // Get Form Values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value

  // Instantiate new Book
  const book = new Book(title, author, isbn)

  // Instantiate new UI and Store
  const ui = new UI()
  const store = new Store()

  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Error message
    ui.showAlert("Please fill in all fields", "error")
  } else {
    // Add book to list and local storage
    ui.addBookToList(book)
    store.addBook(book)

    // Clear fields
    ui.clearFields()

    // Success alert
    ui.showAlert("Book successfully added.", "success")
  }

  e.preventDefault()
})

// delete book
document.getElementById("book-list").addEventListener("click", e => {
  const ui = new UI()
  const store = new Store()
  ui.deleteBook(e.target)
  store.deleteBook(e.target.parentElement.previousElementSibling.textContent)
  ui.showAlert("Book successfully removed.", "success")
  e.preventDefault()
})
