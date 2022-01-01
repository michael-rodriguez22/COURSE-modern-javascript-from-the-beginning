# Course - Modern Javascript From The Beginning

## DOM Mini Projects

### Task List

An app that allows users to create, delete, and filter tasks. It is a single html page styled using the Materialize and Font Awesome CDNs.

On page load, tasks are fetched from local storage (if there are any) and rendered as list items containing the task text and a delete icon. Tasks can be deleted individually or all at once. These changes are reflected in local storage.

An event listener on the filter input field uses the String.indexOf() method to check if the given value is a substring in any of the current tasks. Tasks are then displayed / hidden appropriately.
