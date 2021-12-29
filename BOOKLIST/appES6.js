class Book {
  constructor(title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn
  }
}

class UI {
  // Add Book to list
  static addBookToList(book) {
    // Create, populate, and append table row
    const list = document.getElementById("book-list")
    const row = document.createElement("tr")
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `
    list.appendChild(row)
  }

  // Show alert
  static showAlert(message, className) {
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
  static clearFields() {
    document.getElementById("title").value = ""
    document.getElementById("author").value = ""
    document.getElementById("isbn").value = ""
  }

  // Delete Book
  static deleteBook(target) {
    return target.parentElement.parentElement.remove()
  }
}

class Store {
  static getBooks() {
    let books
    localStorage.getItem("book-list-books") === null
      ? (books = [])
      : (books = JSON.parse(localStorage.getItem("book-list-books")))

    return books
  }

  static displayBooks() {
    const books = Store.getBooks()
    return books.forEach(book => {
      UI.addBookToList(book)
    })
  }

  static addBook(book) {
    const books = Store.getBooks()
    books.push(book)

    return localStorage.setItem("book-list-books", JSON.stringify(books))
  }

  static removeBook(isbn) {
    const books = Store.getBooks()
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1)
      }
    })
    return localStorage.setItem("book-list-books", JSON.stringify(books))
  }
}

// Event Listeners
// display books from storage
document.addEventListener("DOMContentLoaded", Store.displayBooks())

// add book
document.getElementById("book-form").addEventListener("submit", e => {
  // Get Form Values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value

  // Instantiate new Book
  const book = new Book(title, author, isbn)

  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Error message
    UI.showAlert("Please fill in all fields", "error")
  } else {
    // Add book to list
    UI.addBookToList(book)

    // Add book to local storage
    Store.addBook(book)

    // Clear fields
    UI.clearFields()

    // Success alert
    UI.showAlert("Book successfully added.", "success")
  }

  e.preventDefault()
})

// delete book
document.getElementById("book-list").addEventListener("click", e => {
  if (e.target.className === "delete") {
    UI.deleteBook(e.target)
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    UI.showAlert("Book successfully removed.", "success")
  }
  e.preventDefault()
})
