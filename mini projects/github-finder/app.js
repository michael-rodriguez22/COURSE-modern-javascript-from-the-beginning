const github = new GitHub()
const ui = new UI()

// Search input event listener
const searchUser = document.getElementById("search-user")
searchUser.addEventListener("keyup", e => {
  // get input text
  const userText = e.target.value
  if (userText !== "") {
    // make GET request
    github.getUser(userText).then(data => {
      if (data.profile.message === "Not Found") {
        // show alert
        ui.showAlert("No user found with this name", "alert alert-danger")
      } else {
        // show profile with repos
        ui.showProfile(data.profile)
        ui.showRepos(data.repos)
      }
    })
  } else {
    // clear profile
    ui.clearProfile()
  }
})
