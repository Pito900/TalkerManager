const express = require('express');

const route = express.Router();
const fs = require('fs');

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

module.exports = route;