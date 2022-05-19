const express = require('express');

const route = express.Router();
const fs = require('fs');
const crypto = require('crypto');

route.post('/', (req, res) => {
    const { email, password } = req.body;
    const data = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
    data.push({ email, password });
    const token = crypto.randomBytes(8).toString('hex'); // https://stackoverflow.com/questions/55104802/nodejs-crypto-randombytes-to-string-hex-doubling-size
    return res.status(200).send({ token });
  });

module.exports = route;