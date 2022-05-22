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
    const talkerDataJson = './talker.json';
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const talker = JSON.parse(fs.readFileSync(talkerDataJson, 'utf8'));
    const id = talker.length + 1;
    fs.writeFileSync(talkerDataJson, 
    JSON.stringify([...talker, { name, id, age, talk: { watchedAt, rate } }], null, 2));
    res.status(201).json({ id, name, age, talk: { watchedAt, rate } });
});

route.put('/:id',
  middle.validateToken,
  middle.validateName, 
  middle.validateAge, 
  middle.validateTalk, 
  middle.validateDate, 
  middle.validateRate,
  (req, res) => {
    const talkerDataJson = './talker.json';
    const talker = JSON.parse(fs.readFileSync(talkerDataJson, 'utf8'));
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const { id } = req.params;
    const aData = { id: parseInt(id, 10), name, age, talk: { watchedAt, rate } };
    const tIndex = talker.map((item) => (item.id === Number(id) ? aData : item));
    if (tIndex) {
      fs.writeFileSync(talkerDataJson,
      JSON.stringify(tIndex));
      res.status(200).json(aData);
    }
});

module.exports = route;