require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;

const {Recipe} = require("../db");

const filtro = (array) => {
    return [array].map((elem) =>{
      return {
          id: elem.id, 
          title: elem.title,
          image: elem.image,
          summary: elem.summary,                             
          healthScore: elem.healthScore,                      
          analyzedInstructions: elem.analyzedInstructions, 
          diets: elem.diets  
         }})
    };

const getIdFood = async (id, validar) => {
    const Food = validar === "api" 
    ? (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`))
    .data
    : await Recipe.findByPk(id);
    
    const filtroId = filtro(Food);
    return filtroId; 
}




module.exports = { getIdFood }