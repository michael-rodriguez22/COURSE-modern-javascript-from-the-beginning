// page state
class PageState {
  constructor() {
    let currentState = new homeState(this)

    this.init = function () {
      this.change(new homeState())
    }

    this.change = function (state) {
      currentState = state
    }
  }
}

// home state
const homeState = function (page) {
  document.getElementById("heading").textContent = null
  document.getElementById("content").innerHTML = `
    <div class="p-5 mb-4 bg-light rounded-3">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">Home Page</h1>
        <p class="col-md-8 fs-4">
          home page home page home page home page home page home page home page home page home page
        </p>
        <button class="btn btn-primary btn-lg" type="button">Very cool and useful button</button>
      </div>
    </div>
  `
}

const aboutState = function (page) {
  document.getElementById("heading").innerHTML =
    '<h1 class="display-5 fw-bold">About Page</h1>'
  document.getElementById("content").innerHTML = `
    <p class="col-md-8 fs-4">
      about x64
    </p>
    `
}

const contactState = function (page) {
  document.getElementById("heading").innerHTML =
    '<h1 class="display-5 fw-bold">Contact Page</h1>'
  document.getElementById("content").innerHTML = `
    <form>
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" placeholder="Your Name">
      </div>
      <div class="form-group">
        <label>Message</label>
        <input type="text" class="form-control" placeholder="Your Message">
      </div>
      <div class="d-grid mt-3">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  `
}

const page = new PageState()
page.init()

// UI variables
const home = document.getElementById("home"),
  about = document.getElementById("about"),
  contact = document.getElementById("contact")

// event listeners
home.addEventListener("click", e => {
  page.change(new homeState())
  e.preventDefault
})

about.addEventListener("click", e => {
  page.change(new aboutState())
  e.preventDefault
})

contact.addEventListener("click", e => {
  page.change(new contactState())
  e.preventDefault
})
