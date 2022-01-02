// Listen for submit
document.getElementById("loan-form").addEventListener("submit", e => {
  e.preventDefault()
  // hide results
  document.getElementById("results").style.display = "none"

  // show loader
  document.getElementById("loading").style.display = "block"

  setTimeout(calculateResults, 2000)
})

// Calculate Results
function calculateResults(e) {
  const amount = document.getElementById("amount"),
    interest = document.getElementById("interest"),
    years = document.getElementById("years"),
    monthlyPayment = document.getElementById("monthly-payment"),
    totalPayment = document.getElementById("total-payment"),
    totalInterest = document.getElementById("total-interest")

  const principal = parseFloat(amount.value),
    calculatedInterest = parseFloat(interest.value) / 100 / 12,
    calculatedPayments = parseFloat(years.value) * 12

  // compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments),
    monthly = (principal * x * calculatedInterest) / (x - 1)

  if (isFinite(monthly)) {
    monthlyPayment.value = `$${monthly.toFixed(2)}`
    totalPayment.value = `$${(monthly * calculatedPayments).toFixed(2)}`
    totalInterest.value = `$${(
      monthly * calculatedPayments -
      principal
    ).toFixed(2)}`

    // hide loader
    document.getElementById("loading").style.display = "none"

    // show results
    document.getElementById("results").style.display = "block"
  } else {
    // hide loader
    document.getElementById("loading").style.display = "none"

    // hide results
    document.getElementById("results").style.display = "none"

    // show error
    showError("Please check your numbers...")
  }
}

// Show Error
function showError(error) {
  // get elements
  const card = document.querySelector(".card")
  const heading = document.querySelector(".heading")

  // create error div
  const errorDiv = document.createElement("div")
  errorDiv.className = "alert alert-danger"
  errorDiv.appendChild(document.createTextNode(error))

  // insert error above heading
  card.insertBefore(errorDiv, heading)

  // clear after 3 seconds
  setTimeout(() => document.querySelector(".alert").remove(), 2500)
}
