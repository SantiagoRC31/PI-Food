require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;

const {Recipe} = require("../db");

const getIdFood = async (id, validar) => {
    let Food;
  
    if (validar === "api") {
      // Obtener detalles de la API
      Food = (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)).data;
    } else {
      // Obtener detalles de la base de datos local
      Food = await Recipe.findByPk(id, {
        include: "diets", 
      });
    }
  
    const filtered = (array) => {
        return [array].map((elem) => {
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
   const filteredFood = filtered(Food)
    
    return filteredFood;
}




module.exports = { getIdFood }