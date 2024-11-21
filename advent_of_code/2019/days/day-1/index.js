const fs = require('fs');

const getFuel = x => Math.floor(Number(x) / 3) - 2
const add = (a, b) => a + b
const last = xs => xs[xs.length - 1]

const getTotalFuel = x => {
  if (getFuel(x) < 0) return x
  return x + getTotalFuel(getFuel(x))
}

fs.readFile('./puzzle.txt', 'utf-8', (err, res) => {
  const result = res.split('\n')
  const firstPart= result.map(x => getFuel(x)).reduce(add, 0)
  const secondPart = result.map(x => getTotalFuel(getFuel(x))).reduce(add, 0)

  console.log(firstPart, secondPart)
})
