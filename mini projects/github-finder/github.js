class GitHub {
  constructor() {
    this.client_id = "4e5aea42b037aeb990ea"
    this.client_secret = "59938262830747dc182c5374c5fd999f3666c555"
    this.repos_count = 5
    this.repos_sort = "created: asc"
  }

  async getUser(user) {
    // user information
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    )
    const profile = await profileResponse.json()

    // assosciated repositories
    const repoResponse = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
    )
    const repos = await repoResponse.json()

    return {
      profile,
      repos,
    }
  }
}
