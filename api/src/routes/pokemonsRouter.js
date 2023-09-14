const { Router } = require('express');
const router = Router();
const { getPokemonsHandler, getPokemonByIdHandler, postPokemonHandler, deletePokemonHandler } = require('../handlers/pokemonHandlers');



router.get('/', getPokemonsHandler);

router.get('/:id', getPokemonByIdHandler);

router.post('/', postPokemonHandler)

router.delete('/:id', deletePokemonHandler);

module.exports = router;