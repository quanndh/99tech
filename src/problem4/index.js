function sum_to_n_a(n) {
  // Time O(n): loop execute n times
  // Space O(1): fixed number of variables regardless of input
  let sum = 0;
  for (i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

function sum_to_n_b(n) {
  // Time O(1): execute 1 time
  // Space O(1): no variables created
  return (n * (n + 1)) / 2;
}

function sum_to_n_c(n) {
  // Time O(n): 1 recursive call for each value of n
  // Space O(n): fill the main stack with n calls
  if (n <= 1) return n;
  return n + sum_to_n_c(n - 1);
}

console.log(sum_to_n_a(5), sum_to_n_b(5), sum_to_n_c(5));
