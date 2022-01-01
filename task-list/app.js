// define UI variables
const form = document.querySelector("#task-form")
const taskList = document.querySelector(".collection")
const clearBtn = document.querySelector(".clear-tasks")
const filter = document.querySelector("#filter")
const taskInput = document.querySelector("#task")

// Get Tasks from Local Storage
function getTasks() {
  let tasks
  localStorage.getItem("tasks") === null
    ? (tasks = [])
    : (tasks = JSON.parse(localStorage.getItem("tasks")))

  tasks.forEach(task => {
    const li = document.createElement("li")
    li.className = "collection-item"
    li.appendChild(document.createTextNode(task))

    const link = document.createElement("a")
    link.className = "delete-item secondary-content"
    link.innerHTML = '<i class="fas fa-times"></i>'

    li.appendChild(link)
    taskList.appendChild(li)
  })
}

// Store to Local Storage
function storeToLocalStorage(task) {
  let tasks
  localStorage.getItem("tasks") === null
    ? (tasks = [])
    : (tasks = JSON.parse(localStorage.getItem("tasks")))

  tasks.push(task)
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

// Add Task
function addTask(e) {
  e.preventDefault()
  if (taskInput.value === "") return alert("Task field is empty")

  const li = document.createElement("li")
  li.className = "collection-item"
  li.appendChild(document.createTextNode(taskInput.value))

  const link = document.createElement("a")
  link.className = "delete-item secondary-content"
  link.innerHTML = '<i class="fas fa-times"></i>'

  li.appendChild(link)
  taskList.appendChild(li)
  storeToLocalStorage(taskInput.value)
  taskInput.value = ""
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure you'd like to remove this task?")) {
      e.target.parentElement.parentElement.remove()

      let tasks
      localStorage.getItem("tasks") === null
        ? (tasks = [])
        : (tasks = JSON.parse(localStorage.getItem("tasks")))

      tasks.forEach((item, index) => {
        if (e.target.parentElement.parentElement.textContent === item) {
          tasks.splice(index, 1)
        }
      })

      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }
}

// Clear Tasks
function clearTasks(e) {
  if (!taskList.firstChild) {
    alert("There are no tasks to clear.")
  } else if (confirm("Are you sure you'd like to clear all tasks?")) {
    while (taskList.firstChild) taskList.removeChild(taskList.firstChild)
    localStorage.removeItem("tasks")
  }
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase()

  document.querySelectorAll(".collection-item").forEach(task => {
    task.textContent.toLowerCase().indexOf(text) != -1
      ? (task.style.display = "block")
      : (task.style.display = "none")
  })
}

// Load all event listeners
function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", getTasks)
  form.addEventListener("submit", addTask)
  taskList.addEventListener("click", removeTask)
  clearBtn.addEventListener("click", clearTasks)
  filter.addEventListener("keyup", filterTasks)
}

loadEventListeners()
