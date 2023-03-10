const express = require('express')
const app = express()
const crypto = require('crypto')
const axios = require('axios')
const port = 3000

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

app.get('/rhm', async (req, res) => {
    // Start the timer
    const promise = sleep(1000);

    // Create hash with current time
    const hash = crypto.createHash('sha256')

    // Add microsecond to seconds to improve randomness
    hash.update(`${process.hrtime()[1] + (new Date()).getTime() * 1000}`)

    // Wait for timer to finish
    await promise;

    // Send hash as hex
    res.send(hash.digest('hex'))
})

app.get('/q2', async (req, res) => {

    // Safeguard
    let maxIter = 1000;

    // Naive implementation
    // let hash = null;
    // let char = null;
    // do {
    //     const response = await axios.get(`http://localhost:${port}`);
    //     hash = response.data;
    //     char = hash[hash.length - 1];
    //     maxIter--;
    // }
    // while (char % 2 !== 1 && maxIter > 0) // Only allow odd numbers

    // res.send(`Hash: ${hash}, Last Character: ${hash[hash.length - 1]}`);

    // async await implementation
    while (maxIter > 0) {
        // Start requests simultaneously
        let promises = []
        for (let i = 0; i < 10; i++) {
            promises.push(axios.get(`http://localhost:${port}/rhm`));
        }

        promises = await Promise.all(promises);

        // Check if any of them have a hash with an odd number
        const hash = promises.map(response => response.data).find((hash) => {
            return hash[hash.length - 1] % 2 === 1;
        })

        if (hash) {
            res.send(`Hash: ${hash}, Last Character: ${hash[hash.length - 1]}`);
            return;
        }
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})