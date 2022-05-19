const express = require('express');

const route = express.Router();
const fs = require('fs');
const middle = require('../middlewares');

route.get('/', (_request, response) => {
    const data = fs.readFileSync('./talker.json', 'utf8');
  if (data.length === 0) return response.status(200).send([]);
  response.status(200).send(JSON.parse(data));
});

route.get('/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
    const { id } = req.params;
    const talker = data.find((r) => r.id === Number(id));
    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).send(talker);
});

route.post('/',
  middle.validateToken,
  middle.validateName, 
  middle.validateAge, 
  middle.validateTalk, 
  middle.validateDate, 
  middle.validateRate,
  (req, res) => {
    const talkerJson = './talker.json';
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const talker = JSON.parse(fs.readFileSync(talkerJson, 'utf8'));
    const id = talker.length + 1;
    fs.writeFileSync(talkerJson, 
    JSON.stringify([...talker, { name, id, age, talk: { watchedAt, rate } }], null, 2));
    const newData = { id, name, age, talk: { watchedAt, rate } };
    res.status(201).json(newData);
});

module.exports = route;