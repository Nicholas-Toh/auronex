const express = require('express')
const app = express()
const crypto = require('crypto')
const port = 3000

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

app.get('/', async (req, res) => {
    // Start the timer
    const promise = sleep(1000);

    // Create hash with current time
    const hash = crypto.createHash('sha256')
    hash.update(`${new Date().getTime()}`)

    // Wait for timer to finish
    await promise;

    // Send hash as hex
    res.send(hash.digest('hex'))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})