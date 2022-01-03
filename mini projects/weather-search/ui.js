class UI {
  constructor() {
    this.location = document.getElementById("w-location")
    this.description = document.getElementById("w-description")
    this.string = document.getElementById("w-string")
    this.icon = document.getElementById("w-icon")
    this.wind = document.getElementById("w-wind")
    this.humidity = document.getElementById("w-humidity")
    this.uvIndex = document.getElementById("w-uv-index")
    this.feelsLike = document.getElementById("w-feels-like")
  }

  paint({ location, current }) {
    this.location.textContent = `${location.name}${
      location.region ? " " + location.region : ""
    }`
    this.description.textContent = current.condition.text
    this.string.textContent = `${current.temp_f} °F`
    this.icon.setAttribute("src", current.condition.icon)
    this.wind.textContent = `Wind Speed: ${current.wind_mph} MPH`
    this.humidity.textContent = `Humidity: ${current.humidity}%`
    this.uvIndex.textContent = `UV Index: ${current.uv}`
    this.feelsLike.textContent = `Feels Like: ${current.feelslike_f} °F`
  }
}
