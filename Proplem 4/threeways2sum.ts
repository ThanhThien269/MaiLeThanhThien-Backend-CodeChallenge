const n = 5;

//Using Math Formula - Big O: O(1)
function sum_to_n_a(n: number): number {
  return (n * (n + 1)) / 2;
}

//Using For loop - Big O: O(n)
function sum_to_n_b(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}
//Using Recursion - Big O: O(n)
function sum_to_n_c(n: number): number {
  if (n === 1) {
    return 1;
  } else {
    return n + sum_to_n_c(n - 1);
  }
}

const result1 = sum_to_n_a(n);
const result2 = sum_to_n_b(n);
const result3 = sum_to_n_c(n);

//output
console.log(
  `Formula: ${Array.from({ length: n }, (_, i) => i + 1).join(
    "+"
  )} === ${result1}`
);
console.log(
  `For-loop: ${Array.from({ length: n }, (_, i) => i + 1).join(
    "+"
  )} === ${result2}`
);
console.log(
  `Recursion: ${Array.from({ length: n }, (_, i) => i + 1).join(
    "+"
  )} === ${result3}`
);
