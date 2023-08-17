const { Diets } = require("../db");
const { getApiDiets } = require("../Controllers/diets");

const getDiets = async (req, res) => {
  try {
    const diets = await Diets.findAll();
    if (diets.length === 0) {
      await getApiDiets();
    }
    const dbDiets = await Diets.findAll();
    res.status(200).json(dbDiets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDiets,
};

