const data = [1, 3, 15, 17, 21, 28, 44, 69, 100, 222, 420]

function linearSearch(arr, target) {
  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] === target) {
      return `Target was found at index ${i}.`
    }
  }
  return `Target does not exist in this array.`
}

function iterativeBinarySearch(arr, target) {
  let left = 0
  let right = arr.length - 1
  let mid = (left + right) / 2

  while (left <= right) {
    if (arr[mid] === target) {
      return `Target was found at index ${mid}`
    } else if (arr[mid] < target) {
      left = mid + 1
      mid = Math.floor((left + right) / 2)
    } else if (arr[mid] > target) {
      right = mid - 1
      mid = Math.floor((left + right) / 2)
    }
  }
  return `Target does not exist in this array.`
}

function recursiveBinarySearch(arr, target) {
  let mid = Math.floor(arr.length / 2)
  if (arr.length === 1 && arr[0] !== target) {
    return `Target does not exist in this array.`
  }
  if (target === arr[mid]) {
    return `Target was found.`
  } else if (target < arr[mid]) {
    return recursiveBinarySearch(arr.slice(0, mid), target)
  } else if (target > arr[mid]) {
    return recursiveBinarySearch(arr.slice(mid), target)
  }
}

console.log(recursiveBinarySearch(data, 28))
console.log(recursiveBinarySearch(data, 20))
console.log(recursiveBinarySearch(data, 420))
console.log(recursiveBinarySearch(data, 222))
