const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const rutas = require("./food");
const rutaDiets = require("./diets")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



router.use("/", rutas);
router.use("/diets", rutaDiets);


module.exports = router;

