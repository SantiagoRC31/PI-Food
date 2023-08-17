require("dotenv").config();
const { API_KEY } = process.env;

const { Op } = require("sequelize");
const { Recipe, Diets, RecipeDiets } = require("../db");
const axios = require("axios");

const filtro = (array) => {
  return array.results.map((elem) => {
    return {
      id: elem.id,
      title: elem.title,
      image: elem.image,
      diets: elem.diets.map((d) => { return { name: d } }),
      summary: elem.summary,
      healthScore: elem.healthScore,
      analyzedInstructions: elem.analyzedInstructions,
    }
  })
};



const getFoodDB = async (title) => {
  const foodByNameDB = await Recipe.findAll({
    where: {
      title: { [Op.iLike]: `%${title}%` }
    },
    include: {
      model: Diets,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  })

  const foodApi = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&titleMatch=${title}&addRecipeInformation=true`)).data;
  const filtroApi = filtro(foodApi);


  const validacion = [...foodByNameDB, ...filtroApi];
  if (validacion.length === 0) {
    throw new Error(`No se encontró ninguna comida con el nombre '${title}'.`);
  }
  return validacion;
}

const getFoodApi = async () => {
  try {
    const foodAll = await Recipe.findAll({
      include: {
        model: Diets,
        through: RecipeDiets,
      },
    });
    


    const foodAllApi = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)).data;
    const filtroApi1 = filtro(foodAllApi);

    return [...foodAll, ...filtroApi1]

  } catch (error) {
    console.log(error)
    throw error;
  }

}

module.exports = { getFoodDB, getFoodApi }