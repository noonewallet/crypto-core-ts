const fs = require('fs')
const {randomBytes} = require('@noble/hashes/utils')

const steps = 23
const list = []

for (let i = 0; i <= steps; i++) {
  const d = randomBytes(65536)
  list.push(d)
}

const newBuff = Buffer.concat(list)

// Save byte entropy
fs.writeFile('output', newBuff, 'utf8', function (err) {
  if (err) {
    return console.log(err)
  }
  console.log('The file was saved!')
})
