// GET
EasyHTTP.get("https://jsonplaceholder.typicode.com/users/")
  .then(data => console.log(data))
  .catch(err => console.log(err))

const userData = {
  name: "Michael Rodriguez",
  username: "michaelrodriguez22",
  email: "email@email.com",
}

// POST
EasyHTTP.post("https://jsonplaceholder.typicode.com/users/", userData)
  .then(data => console.log(data))
  .catch(err => console.log(err))

// PUT
EasyHTTP.put("https://jsonplaceholder.typicode.com/users/1", userData)
  .then(data => console.log(data))
  .catch(err => console.log(err))

// DELETE
EasyHTTP.delete("https://jsonplaceholder.typicode.com/users/3")
  .then(data => console.log(data))
  .catch(err => console.log(err))
