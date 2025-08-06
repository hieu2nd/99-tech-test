// Recursive approach
var sum_to_n_a = function (n) {
  if (n === 0) return 0
  return n + sum_to_n_a(n - 1) 
}

// Iterative approach
var sum_to_n_b = function (n) {
  let sum = 0
  for (let i = 0; i <= n; i++) {
    sum += i
  }
  return sum 
}

// Formula approach
var sum_to_n_c = function (n) {
  return (n * (n + 1)) / 2 
}

console.log(sum_to_n_a(5))
console.log(sum_to_n_b(5))
console.log(sum_to_n_c(5))
