const express = require('express');
const router = express.Router();
const {getTypesHandler} = require('../controllers/pokemonControllers');

router.get('/', getTypesHandler)

module.exports = router;
