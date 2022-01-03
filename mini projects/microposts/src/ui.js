class UI {
  constructor() {
    this.postsContainer = document.querySelector(".postsContainer")
    this.posts = document.getElementById("posts")
    this.titleInput = document.getElementById("title")
    this.bodyInput = document.getElementById("body")
    this.idInput = document.getElementById("id")
    this.postSubmit = document.querySelector(".post-submit")
    this.forState = "add"
  }

  showPosts(posts) {
    let output = ""
    posts.forEach(post => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fas fa-edit"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fas fa-trash-alt"></i>
            </a>
          </div>
        </div>
      `
    })
    this.posts.innerHTML = output
  }

  showAlert(message, classes) {
    this.clearAlert()
    const div = document.createElement("div")
    div.className = classes
    div.appendChild(document.createTextNode(message))
    this.postsContainer.insertBefore(div, this.posts)
    setTimeout(() => this.clearAlert(), 3000)
  }

  clearAlert() {
    const currentAlert = document.querySelector(".alert")
    currentAlert && currentAlert.remove()
  }

  clearFields() {
    this.titleInput.value = ""
    this.bodyInput.value = ""
  }

  clearIdInput() {
    this.idInput.value = ""
  }

  fillForm({ title, body, id }) {
    this.titleInput.value = title
    this.bodyInput.value = body
    this.idInput.value = id

    this.changeFormState("edit")
  }

  changeFormState(type) {
    if (type === "edit") {
      this.postSubmit.textContent = "Update Post"
      this.postSubmit.className = "post-submit btn btn-warning mb-1"

      const button = document.createElement("button")
      button.className = "post-cancel btn btn-block bg-primary text-light"
      button.appendChild(document.createTextNode("Cancel Edit"))
      document.querySelector(".card-form").appendChild(button)
    } else {
      this.postSubmit.textContent = "Post it!"
      this.postSubmit.className = "post-submit btn btn-primary mb-1"

      document.querySelector(".card-form") &&
        document.querySelector(".card-form").lastElementChild.remove()

      this.clearIdInput()
      this.clearFields()
    }
  }
}

export const ui = new UI()
