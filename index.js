const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app
  .route('/talker')
  .get(async (_request, response) => {
    const data = fs.readFileSync('./talker.json', 'utf8');
  if (data.length === 0) return response.status(200).send([]);
  response.status(HTTP_OK_STATUS).send(JSON.parse(data));
});

app
  .route('/talker/:id')
  .get((req, res) => {
    const data = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
    const { id } = req.params;
    const talker = data.find((r) => r.id === Number(id));
    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).send(talker);
});