const validateDate = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    const regexData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
    if (!watchedAt) {
        return res.status(400).send({
             message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
        } 
    if (regexData.test(watchedAt) === false) {
        return res.status(400).send({ 
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
};

module.exports = validateDate;