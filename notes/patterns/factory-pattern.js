function MemberFactory() {
  this.createMember = function (name, type) {
    let member

    if (type === "simple") {
      member = new SimpleMembership(name)
    } else if (type === "standard") {
      member = new StandardMembership(name)
    } else if (type === "super") {
      member = new SuperMembership(name)
    }

    member.type = type

    member.define = function () {
      console.log(`${this.name} (${this.type}): ${this.cost}`)
    }

    return member
  }
}

const SimpleMembership = function (name) {
  this.name = name
  this.cost = "$0"
}

const StandardMembership = function (name) {
  this.name = name
  this.cost = "$10"
}

const SuperMembership = function (name) {
  this.name = name
  this.cost = "$20"
}

const members = []
const factory = new MemberFactory()
members.push(factory.createMember("doggy", "simple"))
members.push(factory.createMember("dogglo", "standard"))
members.push(factory.createMember("dogger", "super"))

console.log(members)

members.forEach(member => member.define())
