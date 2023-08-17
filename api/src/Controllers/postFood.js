const { Recipe, Diets } = require("../db");

const postFoods = async (title, image, summary, healthScore, analyzedInstructions, diets) => {
    try {
        // Verificar si ya existe una comida con el mismo título
        const existingFood = await Recipe.findOne({ where: { title: title } });
        if (existingFood) {
            throw new Error("Ya existe una comida con este título");
        }

        const newFood = await Recipe.create({
            title,
            image,
            summary,
            healthScore,
            analyzedInstructions,
            created: true
        });

        await Promise.all(diets.map((diet) => newFood.addDiets(diet.id))).catch(
            (error) => {
                console.error(error);
                return Promise.reject("Error try save all diets");
            }
        );

        return newFood;
    } catch (error) {
        console.log(error);
        throw error
    }
};


module.exports = { postFoods }