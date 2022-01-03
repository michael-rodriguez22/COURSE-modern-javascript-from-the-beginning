variables could be camelCase, under_score, PascalCase, or lowercase

Primitive Data Types:

- stored directly in the location the variable accesses
- stored on the stack

string, number, boolean, null, undefined, symbols

Reference Data Types:

- Accessed by reference
- Objects that are stored on the heap(dynamically allocated memory)
- A pointer to a location in memory

arrays, object literals, functions, dates, anything else...

JS dynamically typed (values not assigned types at declaration)

Most other languages are statically typed

IIFE: Immediately Invocable Function Expression (anonymous function inside parentheses which is immediately called)

HTTP Statuses:

- 200: OK
- 403: Forbidden
- 404: Not Found

XMLHttpRequest.readyState values:

- 0: request not initialized
- 1: server connection established
- 2: request received
- 3: processing request
- 4: response ready

REST = Representational State Transfer

- architectural style for designing networked applications
- relies on a stateless, client-server protocol (almost always HTTP)
- treats server objects as resources that can be created or destroyed
- can be used by virtually any programming language
- all APIs have their own rules and structures
- get, post, put, delete
- endpoints: URL's you access to do certain things

### Regex Notes

- exec() will return result in an array or null
- test() returns true or false
- match() returns result array or null
- search() returns index of first match or -1
- replace() return a new string with some or all matches of the pattern
- i flag = case insensitive
- g flag = global search (return all instances not just first match)
- ^ = must start with the following character or group
- $ = must end with the previous character or group
- . = match any one character
- \* = match any character 0 to infinity times
- ? = previous character or group is optional
- - = match the previous character or group one or more times
- [a-z] = character sets
- [^a-z] = negated character sets
- {} = quantifiers
- - {m} = must occur m times
- - {m,} = must occur at least m times
- - {m,n} = must occur m to n times
- () = grouping
- \\w = word character (any alphanumeric character or underscore)
- \\W = NON word character
- \\d = digit character
- \\D = NON digit character
- \\s = whitespace character (space, tab, linebreak)
- \\S = NON whitespace character
- \\b = word boundary (before the first character in the string if the first character is a word character, after the last character in the string if the last character is a word character, between two characters in the string where one is a word character and the other is not a word character)
- x(?=y) matches x only if it is followed by y

---

Iterator = advanced loops that can be paused

Generator = advanced functions that can be paused and return multiple values

if i = 0, array[i++] will access the 0 index of the array, THEN increment i by 1

No two symbols can be the same (good for unique object keys)

Symbols are not enumerable in for... in

Symbols are ignored by JSON.stringify()

Maps = objects that hold key value pairs. Any type can be used as a key or a value. Can loop through using for... of

Sets = list of unique values of any type (can't add two of the same value)

---

### Module Pattern

not directly supported in browsers (need a compiler like webpack or babel)

individual piece of code with private and public variables and functions

revealing module pattern = return an object literal that reveals certain private methods and vars from a module

normally name private variables beginning with an underscore (let \_data = ["something", "something else"])

---

### Singleton Pattern

Singleton object = immediate anonymous function that can only return one instance of an object at a time

Used to create objects but you can only instantiate each object once

---

### Factory Pattern

Interface for creating multiple objects

often used for managing and maintaining many different objects that have a lot of similar characteristics

---

### Observer Pattern

Subscribe and unsubscribe to certain events

Used a lot in AngularJS

---

### Mediator Pattern

Mediator = interface for communicating with colleagues (objects that must interact with each other in specific ways)

useful when objects need to be aware of other state changes in other objects in the group

---

import \* as mod from "./mymodule" will import all exports from mymodule as properties and methods on the mod object
