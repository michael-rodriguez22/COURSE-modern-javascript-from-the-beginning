class EventObserver {
  constructor() {
    this.observers = []
  }

  subscribe() {
    this.observers.push(fn)
    console.log(`You are now subscribed to ${fn.name}`)
  }

  unsubscribe() {
    this.observers = this.observers.filter(item => item !== fn)
    console.log(`You are now unsubscribed from ${fn.name}`)
  }

  fire() {
    this.observers.forEach(item => item.call())
  }
}

const click = new EventObserver()

// create event listeners
document.querySelector(".sub-ms").addEventListener("click", function () {
  click.subscribe(getCurMilliseconds)
})
document.querySelector(".unsub-ms").addEventListener("click", function () {
  click.unsubscribe(getCurMilliseconds)
})
document.querySelector(".sub-s").addEventListener("click", function () {
  click.subscribe(getCurSeconds)
})
document.querySelector(".unsub-s").addEventListener("click", function () {
  click.unsubscribe(getCurSeconds)
})
document.querySelector(".fire").addEventListener("click", function () {
  click.fire()
})

// click handlers
const getCurMilliseconds = function () {
  console.log(`Current Milliseconds: ${new Date().getMilliseconds()}`)
}

const getCurSeconds = function () {
  console.log(`Current Seconds: ${new Date().getSeconds()}`)
}
