const data = [
  {
    name: "Thomas Anderson",
    age: 30,
    gender: "male",
    lookingFor: "female",
    location: "Chicago",
    image: "https://randomuser.me/api/portraits/men/20.jpg",
  },
  {
    name: "Arwen Undómiel",
    age: 2319,
    gender: "female",
    lookingFor: "male",
    location: "Rivendell",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
  },
  {
    name: "Misa Amane",
    age: 22,
    gender: "female",
    lookingFor: "male",
    location: "Kyoto",
    image: "https://randomuser.me/api/portraits/women/20.jpg",
  },
  {
    name: "Remy LeBeau",
    age: 28,
    gender: "male",
    lookingFor: "female",
    location: "New Orleans",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
  },
]

const profiles = profileIterator(data)

// Call first profile
nextProfile()

// Next Event
document.getElementById("next").addEventListener("click", nextProfile)

// Next Profile Display
function nextProfile() {
  const currentProfile = profiles.next().value
  if (currentProfile !== undefined) {
    document.getElementById("profile-display").innerHTML = `
    <ul class="list-group">
      <li class="list-group-item">name: ${currentProfile.name}</li>
      <li class="list-group-item">age: ${currentProfile.age}</li>
      <li class="list-group-item">location: ${currentProfile.location}</li>
      <li class="list-group-item">gender: ${currentProfile.gender}</li>
      <li class="list-group-item">looking for: ${currentProfile.lookingFor}</li>
    </ul>
  `
    document.getElementById("image-display").innerHTML = `
    <img src="${currentProfile.image}"/>
  `
  } else {
    window.location.reload()
  }
}

// Profile Iterator
function profileIterator(profiles) {
  let nextIndex = 0

  return {
    next: function () {
      return nextIndex < profiles.length
        ? { value: profiles[nextIndex++], done: false }
        : { done: true }
    },
  }
}
