const http = new EasyHTTP()

// GET
http.get("https://jsonplaceholder.typicode.com/posts/", (error, posts) => {
  error ? console.log(error) : console.log(posts)
})

http.get("https://jsonplaceholder.typicode.com/posts/1", (error, post) => {
  error ? console.log(error) : console.log(post)
})

// POST
const data = {
  title: "oh my god...",
  body: "it's sans from undertale",
}

http.post(
  "https://jsonplaceholder.typicode.com/posts/",
  data,
  (error, post) => {
    error ? console.log(error) : console.log(post)
  }
)

// PUT
const putData = { body: "OH MY GOD!! IT'S SANS FROM UNDERTALE!!!" }

http.put(
  "https://jsonplaceholder.typicode.com/posts/1",
  putData,
  (error, post) => {
    error ? console.log(error) : console.log(post)
  }
)

// DELETE
http.delete("https://jsonplaceholder.typicode.com/posts/1", (error, response) =>
  error ? console.log(error) : console.log(response)
)
