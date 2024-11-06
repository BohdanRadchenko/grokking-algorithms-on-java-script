/**
 * The binary_search function takes a sorted array and an item. If the
 * item is in the array, the function returns its position. You’ll keep track
 * of what part of the array you have to search through.
 * */

const binarySearch = (list, item) => {
    let low = 0
    let high = list.length - 1

    while (low <= high) {
        const mid = Math.ceil((low + high) / 2)
        const guess = list[mid]

        if (guess === item) return mid
        if (guess > item) high = mid - 1
        if (guess < item) low = mid + 1
    }

    return null
}

const myList = [1, 3, 5, 7, 9]

console.log(binarySearch(myList, 3)) // 1
console.log(binarySearch(myList, -1)) // null