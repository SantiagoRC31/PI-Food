require("dotenv").config();
const axios = require("axios");
const { Diets } = require("../db");
const { API_KEY } = process.env;

const getApiDiets = async () => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
    const results = response.data.results;
    const dietsData = results.flatMap((recipe) => recipe.diets);

    const uniqueDiets = [...new Set(dietsData)];

    const transformedData = uniqueDiets.map((diet) => ({
      name: diet,
    }));

    Diets.bulkCreate(transformedData);
  } catch (error) {
    console.error("Error obteniendo las dietas de la API:", error);
    throw error;
  }
};

module.exports = {
  getApiDiets,
};

