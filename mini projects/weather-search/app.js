const ui = new UI()
const store = new Store()
const weather = new Weather(store.getLocation())

// get weather on pageload
document.addEventListener("DOMContentLoaded", getWeather)

// change location event listeners
document
  .getElementById("w-change-btn")
  .addEventListener("click", changeLocation)
document.getElementById("w-form").addEventListener("submit", e => {
  e.preventDefault()
  return changeLocation()
})

function getWeather() {
  weather
    .getWeather()
    .then(data => {
      store.setLocation(data.location.name)
      ui.paint(data)
    })
    .catch(err => console.log(err))
}

function changeLocation() {
  const city = document.getElementById("city")
  weather.changeCity(city.value)
  city.value = ""
  getWeather()
  $("#locModal").modal("hide")
}

store.getLocation()
