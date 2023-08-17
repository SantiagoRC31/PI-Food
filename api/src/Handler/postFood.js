const { postFoods } = require("../Controllers/postFood");


const postFood = async(req, res) =>{
    const {title, image, summary, healthScore, analyzedInstructions, diets} = req.body;
    try {
        const response = await postFoods(title, image, summary, healthScore, analyzedInstructions, diets);
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json({error: error.message});  
    }
}
module.exports = {postFood};