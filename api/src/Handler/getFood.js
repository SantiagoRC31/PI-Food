const { getIdFood } = require("../Controllers/getByIdFood");
const { getFoodDB, getFoodApi } = require("../Controllers/getNameFood");



const getFood = async (req, res) => {
    try {
        const {title}= req.query
        const result = title ? await getFoodDB(title) : await getFoodApi();
    res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error: error.message});

    }
};


const getFoodId = async (req, res) => {
    try {
        const {id} = req.params;
        const validar = isNaN(id) ? "bdd" : "api"
        const response = await getIdFood(id, validar);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};







module.exports ={
    getFood,
    getFoodId,
}