const { Router } = require("express");
const router = Router();
const pokemonsRouter = require("./pokemonsRouter");
const typesRouter = require("./typesRouter");

//----- Routes Config -----
router.use("/pokemons", pokemonsRouter);
router.use("/types", typesRouter);

module.exports = router;
