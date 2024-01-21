const animals = [...require("../data/positive.js"), ...require("../data/negative.js")];

function getObjectFromURL(req, res) {
    const { character, type } = req.params;
    if (!character) {
        res.json(animals);
    } else {
        if (!type) {
            const selected = animals.filter((animal) => animal.character === character);
            if (selected.length === 0) {
                res.status(404).json({ error: 'Objects not found' });
            } else {
                res.json(selected);
            }
        } else {
            const selected = animals.filter((animal) => animal.character === character && animal.animal === type);
            if (selected.length === 0) {
                res.status(404).json({ error: 'Objects not found' });
            } else {
                res.json(selected);
            }
        }
    }
}
module.exports = getObjectFromURL;
