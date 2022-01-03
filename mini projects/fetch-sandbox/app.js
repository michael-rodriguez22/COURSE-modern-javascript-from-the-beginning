function handleErrors(res) {
  if (!res.ok) {
    throw new Error(res.error)
  }
  return res
}

document.getElementById("button1").addEventListener("click", getText)
function getText(e) {
  fetch("./test.txt")
    .then(handleErrors)
    .then(response => response.text())
    .then(text => (document.getElementById("output").innerHTML = text))
    .catch(err => console.log(err))

  e.preventDefault()
}

document.getElementById("button2").addEventListener("click", getJSON)
function getJSON(e) {
  fetch("./test.json")
    .then(handleErrors)
    .then(response => response.json())
    .then(data => {
      let output = ""
      data.forEach(post => (output += `<li>${post.title}: ${post.body}</li>`))
      document.getElementById("output").innerHTML = output
    })
    .catch(err => console.log(err))

  e.preventDefault()
}

document.getElementById("button3").addEventListener("click", getAPI)
function getAPI(e) {
  fetch("https://api.github.com/users")
    .then(handleErrors)
    .then(response => response.json())
    .then(data => {
      let output = ""
      data.forEach(user => (output += `<li>${user.id}: ${user.login}</li>`))
      document.getElementById("output").innerHTML = output
    })
    .catch(err => console.log(err))

  e.preventDefault()
}
