# Course - Modern Javascript From The Beginning

## Language Fundamentals, DOM Manipulation, and Events

The first set of lectures are an introduction to fundamental aspects of the Javascript language. Topics discussed include

```
- primitive data types
- type coercion
- String and Number prototype properties and methods & the Math object
- reference data types such as Arrays, Dates, and other objects
- template literals and object literals
- javascript operators (arithmetic, comparison, assignment, type, logical)
- function declarations and expressions
- for and while loops, if else blocks
- variable scoping (local, global, block level)
```

Focus then shifts to how Javascript is used in the context of front end web development. Topics discussed include:

```
- introduction to the DOM
- DOM selectors, and traversal
- creating, removing, and replacing DOM elements
- common event listeners (click, submit, keypress, DOMContentloaded, etc)
- event bubbling and delegation, callback functions
- the window object and notable properties and methods
- local and session storage
```

## DOM Mini Projects

### Task List

- An app that allows users to create, delete, and filter tasks. It is a single html page styled using the Materialize and Font Awesome CDNs.

- On page load, tasks are fetched from local storage (if there are any) and rendered as list items containing the task text and a delete icon. Tasks can be deleted individually or all at once. These changes are reflected in local storage.

- An event listener on the filter input field uses the String.indexOf() method to check if the given value is a substring in any of the current tasks. Tasks are then displayed / hidden appropriately.

### Loan Calculator

- This app lets users provide a loan amount, fixed interest rate, and number of years to repay. It then calculates the amount of each monthly payment, total payment of the loan, and total amount of interest.

- The page was styled with Bootstrap 4.

- When the form is submitted, a loader spinning logo is briefly displayed ot the page then hidden. Loan results are calculated from the input values.

- If inputs were invalid and accurate results could not be determined, an error message is briefly displayed to the page then hidden. If results were successfully calculated, the results section is then populated and displayed to the DOM.

### Number Guesser

- This page is the first project styled with Skeleton CSS, a really cool light-weight utility based CSS framework.

- Users are able to guess a number between 1 and 10 up to 3 times. If an invalid number is provided, an error alert is displayed. Otherwise an alert with the guesses remaining / winning message / losing message is displayed.
