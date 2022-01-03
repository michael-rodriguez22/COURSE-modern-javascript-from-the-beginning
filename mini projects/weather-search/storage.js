class Store {
  constructor() {
    this.city
    this.defaultCity = "Austin"
    this.key = "michael-rodriguez22-weather-list"
  }

  getLocation() {
    localStorage.getItem(this.key) === null &&
      this.setLocation(this.defaultCity)
    return localStorage.getItem(this.key)
  }

  setLocation(city) {
    localStorage.setItem(this.key, city.toLowerCase())
  }
}
