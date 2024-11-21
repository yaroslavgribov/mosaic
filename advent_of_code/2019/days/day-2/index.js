const { readFile } = require('../../lib/files')

const a2s = s => s.split(',').map(x => +x)

function pipe(
  a,
  ab,
  bc,
  cd,
) {
  switch (arguments.length) {
    case 1:
      return a
    case 2:
      return ab(a)
    case 3:
      return bc(ab(a))
    case 4:
      return cd(bc(ab(a)))
  }
}

const updateAt = (pos, x) => (xs) => {
  const ys = xs.slice()
  ys[pos] = x
  return ys
}

const doMath = f => (startAt, sequence) => {
  const a = sequence[sequence[startAt + 1]]
  const b = sequence[sequence[startAt + 2]]
  const d = sequence[startAt + 3]
  const r = f(a, b)

  return updateAt(d, r)(sequence)
}

const add = (a, b) => a + b
const m = (a, b) => a * b

const doAdd = doMath(add)
const doM = doMath(m)

const run = (sequence) => (startAt) => {
  const opcode = sequence[startAt]
  switch (opcode) {
    case 1: {
      return run(doAdd(startAt, sequence))(startAt + 4)
    }
    case 2: {
      return run(doM(startAt, sequence))(startAt + 4)
    }
    case 99: {
      return sequence[0]
    }
    default: {
      return 'unexpected code => ' + opcode
    }
  }

}

readFile('puzzle.txt').then((res) => {
  const puzzleInput = a2s(res)
  let r = null
  for (i=0; i<=99; i++) {
    for (j=0; j<=99; j++) {
      const try1 = pipe(puzzleInput, updateAt(1, i), updateAt(2, j))
      const output = run(try1)(0)
      if (output === 19690720) {
        console.log(100 * i + j)
      }
    }
  }
})
