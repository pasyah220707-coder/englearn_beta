const materials = require('../models/materialModel');

exports.getMaterial = (req, res) => {
    const { topicId } = req.params;
    const material = materials[topicId];

    if (!material) {
        return res.status(404).json({ message: "Materi tidak ditemukan." });
    }

    res.json(material);
};