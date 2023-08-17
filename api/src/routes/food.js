const {Router} = require("express");

const {getFood} = require("../Handler/getFood");
const {getFoodId} = require("../Handler/getFood");
const { postFood } = require("../Handler/postFood");

const rutas = Router();


rutas.get("/", getFood);

rutas.get("/:id", getFoodId);

rutas.post("/", postFood);


module.exports = rutas;

