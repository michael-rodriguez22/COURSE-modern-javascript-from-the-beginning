import { http } from "./http"
import { ui } from "./ui"

// get posts on DOM load
document.addEventListener("DOMContentLoaded", getPosts)

// listen for add post
document.querySelector(".post-submit").addEventListener("click", submitPost)

// listen for delete post
document.getElementById("posts").addEventListener("click", deletePost)

// listen for edit state
document.getElementById("posts").addEventListener("click", enableEdit)

// listen for cancel edit state
document.querySelector(".card-form").addEventListener("click", cancelEdit)

// get posts
function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err))
}

// submit post (add or edit)
function submitPost() {
  const title = document.getElementById("title").value.trim(),
    body = document.getElementById("body").value.trim(),
    id = document.getElementById("id").value

  // validate input fields
  if (title === "" || body === "")
    return ui.showAlert("invalid input fields", "alert alert-danger")

  // assign input value to properties of data object
  const data = { title, body, id }

  id === ""
    ? // create post
      http
        .post("http://localhost:3000/posts", data)
        .then(() => {
          ui.showAlert("post added!", "alert alert-success")
          ui.clearFields()
          getPosts()
        })
        .catch(err => console.log(err))
    : http
        .put(`http://localhost:3000/posts/${id}`, data)
        .then(() => {
          ui.showAlert("post updated, very updated...", "alert alert-success")
          ui.clearFields()
          ui.changeFormState("add")
          getPosts()
        })
        .catch(err => console.log(err))
}

// delete post
function deletePost(e) {
  e.preventDefault()
  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id
    confirm("Are you sure you'd like to delete this post?") &&
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then(() => {
          ui.showAlert("post removed.", "alert alert-success")
          getPosts()
        })
        .catch(err => console.log(err))
  }
}

// enable edit state
function enableEdit(e) {
  e.preventDefault()
  if (e.target.parentElement.classList.contains("edit")) {
    // assign selected post as properties of data variable
    const id = e.target.parentElement.dataset.id,
      title =
        e.target.parentElement.previousElementSibling.previousElementSibling
          .textContent,
      body = e.target.parentElement.previousElementSibling.textContent
    const data = { id, title, body }

    // fill form with data
    ui.fillForm(data)
  }
}

// cancel edit state
function cancelEdit(e) {
  e.preventDefault()
  e.target.classList.contains("post-cancel") && ui.changeFormState("add")
}
