# Technical Assessment - Auronex

This repository contains the implementations of both Question 1 and 2.

## Installation
`npm install`

## Getting Started
1. Run `node index.js`
2. With base URL `localhost:3000`, the `/q1/{n}` endpoint contains the implementation for Q1. Send a request like `http://localhost:3000/q1/50` to see it in action.
2. `/q2` contains the implementation for Q2. You may set the number of upfront queries by specifying the `n` query parameter, by default it's `16`. The underlying random hash function is at `/rhm`.

## Q2 Documentation
### Random Hash Machine
The random hash machine (RHM) produces a random SHA-256 hash on every call. Internally, it is implemented by hashing the UNIX time and current microseconds. That is, it works if you dont query it faster than 1 microsecond.

### Q2 Implementation
The chance that the last charatcer of the RHM output hash is an odd number is 5/16 or 31%. Using a naive implementation, the server has a 69% chance of having to query the RHM again, leading to a loss of performance.

Instead, by initiating let's say 16 queries up front, the chances of getting an odd number improve to 99% (the higher the number of queries, the better the odds) without needing to perform a subsequent query which will lose 1 second.
