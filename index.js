const express = require('express')
const app = express()
const crypto = require('crypto')
const port = 3000

app.get('/', async (req, res) => {
    const hash = crypto.createHash('sha256')
    hash.update('Hello World!')
    res.send(hash.digest('hex'))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})