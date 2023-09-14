const {getAll, getDB, searchByIdAPI, searchByNameAPI} = require('../controllers/pokemonControllers');
const {Pokemon, Type} = require('../db')



const getPokemonsHandler = async (req, res, next) => {
      try {
        const { name } = req.query;
        if (!name) {
    
          const pokemons = await getAll();
    
          return res.status(200).send(
            pokemons.map((e) => ({
              id: e.id,
              name: e.name,
              image: e.image,
              types: e.types.map((e) => e.name),
              attack: e.attack,
              created: e.created,
            })),
          );
        }
        else {
          //--- DB ---
          const pokemonsDB = await getDB();
          const pokemonFoundDB = pokemonsDB.find(
            (p) => p.name.toLocaleLowerCase() === name.toLocaleLowerCase(),
          );
          if (pokemonFoundDB) {
            return res.status(200).send({
              id: pokemonFoundDB.id,
              name: pokemonFoundDB.name,
              image: pokemonFoundDB.image,
              types: pokemonFoundDB.types.map((e) => e.name),
              attack: pokemonFoundDB.attack,
              created: pokemonFoundDB.created,
            });
          } else {
            const pokemonFoundAPI = await searchByNameAPI(name.toLocaleLowerCase());
            return pokemonFoundAPI
              ? res.status(200).send(pokemonFoundAPI)
              : res.status(404).send("The pokemon doesn't exist");
          }
        }
      } catch (error) {
        next(error);
      }
};
    

const getPokemonByIdHandler =  async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id.includes('-')) {
      const pokemonAPI = await searchByIdAPI(id);
      return pokemonAPI
        ? res.status(200).send(pokemonAPI)
        : res.status(404).send("The pokemon doesn't exist");
    }
    //--- DB ---
    else {
      const pokemonDB = await Pokemon.findByPk(id, {
        include: {
          model: Type,
          attributes: ['name'],
          through: {
            attributes: [],
          },
        },
      });
      return pokemonDB
        ? res.status(200).send({
            id: pokemonDB.id,
            name: pokemonDB.name,
            image: pokemonDB.image,
            hp: pokemonDB.hp,
            attack: pokemonDB.attack,
            defense: pokemonDB.defense,
            speed: pokemonDB.speed,
            height: pokemonDB.height,
            weight: pokemonDB.weight,
            types: pokemonDB.types.map((e) => e.name),
            created: pokemonDB.created,
          })
        : res.status(404).send("The pokemon doesn't exist");
    }
  } catch (error) {
    next(error);
  }
};

const getTypesHandler = async (req, res) => {
    try {
      // Consulta los tipos en la base de datos interna
      const typesFromDB = await Type.findAll();
  
      // Si hay tipos en la base de datos, los devuelve
      if (typesFromDB.length > 0) {
        res.json(typesFromDB);
      } else {
        // Si no hay tipos en la base de datos, obtiene los tipos de la API
        const apiResponse = await axios.get('https://pokeapi.co/api/v2/type');
        const apiTypes = apiResponse.data.results;
  
        // Guarda los tipos en la base de datos
        const savedTypes = await Type.bulkCreate(apiTypes.map((type) => ({ name: type.name })));
  
        res.json(savedTypes);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  


const postPokemonHandler = async (req, res, next) => {
  try {
    const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;

    // Crear el nuevo Pokémon
    const newPokemon = await Pokemon.create({
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
    });

    // Buscar los tipos en la base de datos
    const typeDB = await Type.findAll({
      where: { name: types },
    });

    // Asociar los tipos con el nuevo Pokémon
    await newPokemon.addTypes(typeDB);

    res.status(201).json(newPokemon);
  } catch (error) {
    next(error);
  }
};


const deletePokemonHandler = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedPokemon = await Pokemon.destroy({
        where: {
          id: id
        }
      });
  
      if (deletedPokemon) {
        res.status(200).json({ message: 'Pokemon deleted successfully' });
      } else {
        res.status(404).json({ message: 'Pokémon not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


module.exports = {
    getPokemonsHandler,
    getPokemonByIdHandler,
    getTypesHandler,
    deletePokemonHandler,
    postPokemonHandler,    
}