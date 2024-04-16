/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n === 1) {
    return 1
  }

  if (n === 2) {
    return 2
  }

  let first = 1,
    second = 2,
    count = 3

  let res = first + second

  while (count < n) {
    first = second
    second = res

    res = first + second
    count++
  }

  return res
}

function countSteps(n) {
  function* stepsGenerator() {
    let a = 1
    let b = 2

    while (true) {
      yield a
      ;[a, b] = [b, b + a]
    }
  }

  let res = 0
  let count = 1
  const steps = stepsGenerator()

  while (count <= n) {
    res = steps.next().value
    count++
  }

  return res
}
