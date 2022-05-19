const validateRate = (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (rate < 1 || rate > 5) {
        return res.status(400).send({
             message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
        } 
    if (!rate) {
        return res.status(400).send({ 
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
    }
    next();
};

module.exports = validateRate;