const express = require('express')
const app = express()
const crypto = require('crypto')
const axios = require('axios')
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

app.get('/test', async (req, res) => {
    let char = null
    let hash = null

    // Safeguard
    let maxIter = 1000;

    // Naive implementation
    do {
        const response = await axios.get(`http://localhost:${port}`);
        hash = response.data;
        char = hash[hash.length - 1];
        maxIter--;
    }
    while (char % 2 !== 1 && maxIter > 0) // Only allow odd numbers
    res.send(`Hash: ${hash}, Last Character: ${char}`);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})