const fs = require('fs')

const readFile = path => new Promise(
  (resolve, reject) => fs.readFile(path, 'utf-8', (err, res) =>
    err ? reject(err) : resolve(res)
  )
)

module.exports = { readFile }
