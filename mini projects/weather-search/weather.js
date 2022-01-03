class Weather {
  constructor(city) {
    this.apiKey = "c8398f84ee354b5199d190019212112"
    this.city = city
  }

  async getWeather() {
    const response = await fetch(`
      http://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${this.city}&aqi=yes
    `)
    const responseData = await response.json()
    return responseData
  }

  changeCity(newCity) {
    this.city = newCity
  }
}
