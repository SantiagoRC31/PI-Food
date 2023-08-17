const {Router} = require("express");

const {getDiets} = require("../Handler/diets");

const rutaDiets = Router();


rutaDiets.get("/diets", getDiets);


module.exports = rutaDiets;