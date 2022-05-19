const express = require('express');

const route = express.Router();
const crypto = require('crypto');

route.post('/', (req, res) => {
    const { email, password } = req.body;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        res.status(400).send({ message: 'O campo "email" é obrigatório' });
    } else if (!regexEmail.test(email)) {
        res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
    } else if (!password) {
        res.status(400).send({ message: 'O campo "password" é obrigatório' });
    } else if (password.length < 6) {
        res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    } else {
        const token = crypto.randomBytes(8).toString('hex'); // https://stackoverflow.com/questions/55104802/nodejs-crypto-randombytes-to-string-hex-doubling-size
    return res.status(200).send({ token });
    }
  });

module.exports = route;