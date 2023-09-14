//Importamos axios, los modelos, y lo que vamos a usar como constantes, que son la web a la que haremos la petición,
// y el listado máximo de pokémons que nos devolverá la api
const axios = require('axios');
const {Pokemon, Type} = require('../db')
const { LIMIT, URL } = require('./data');

//Controllers, grupo de handlers que interactuan con la api y la base de datos


const getAPI = async () => {
  //Utilizamos un try para hacer la petición y un catch en caso de que falle
  try {
    //Hacemos una petición a la api externa obteniendo los resultados, y asignamos el valor a la variable data
    const data = (await axios.get(`${URL}${LIMIT}`)).data.results;
    //Realizamos múltiples peticiones Http para acelerar el tiempo de ejecución, y lo asignamos a la variable arrayData
    const arrayData = await Promise.all(data.map((e) => axios.get(e.url)));


    //Retornamos un nuevo array a través del map, devolviendo los elementos que deseamos
    return arrayData.map((e) => {
      return {
        id: e.data.id,
        name: e.data.name,
        image: e.data.sprites.other['official-artwork'].front_default,
        hp: e.data.stats[0].base_stat,
        attack: e.data.stats[1].base_stat,
        defense: e.data.stats[2].base_stat,
        speed: e.data.stats[5].base_stat,
        height: e.data.height,
        weight: e.data.weight,
        types: e.data.types.map((e) => ({ name: e.type.name })),
        created: false,
      };
    });
  } catch (error) {
    console.error(error);
  }
};


const getDB = async () => {
  //Retornamos por medio de una promesa, todos los modelos que tenemos en la bdd, incluyendo los tipos de pokemon
  try {
    return await Pokemon.findAll({
      include: [
        {
          model: Type,
          attributes: ['name'],
          through: {
            attributes: [],
          },
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
};

const getAll = async () => {
  //Llamos a la función para hacer una solicitud a la base de datos, y a la api, y retornamos todo junto con un spread
  try {
    const pokemonsDB = await getDB();
    const pokemonsAPI = await getAPI();

    return [...pokemonsDB, ...pokemonsAPI];
  } catch (error) {
    console.error(error);
  }
};


const searchByNameAPI = async (name) => {
  //Hacemos una petición a la url de la api con la prop NAME, y en el caso de que sea exitoso asignamos el valor a la variable
  //pokemonfound
    try {
      const pokemonFound = (await axios.get(`${URL}${name}`)).data;
      if (pokemonFound) {
        return {
          id: pokemonFound.id,
          name: pokemonFound.name,
          image: pokemonFound.sprites.other['official-artwork'].front_default,
          hp: pokemonFound.stats[0].base_stat,
          attack: pokemonFound.stats[1].base_stat,
          defense: pokemonFound.stats[2].base_stat,
          speed: pokemonFound.stats[5].base_stat,
          height: pokemonFound.height,
          weight: pokemonFound.weight,
          types: pokemonFound.types.map((e) => ({ name: e.type.name })).map((e) => e.name),
          created: false,
        };
      }
    } catch (error) {
      console.error(error);
    }
};


const searchByIdAPI = async (id) => {
  const pokemonFound = (await axios.get(`${URL}${id}`)).data;

  if (pokemonFound) {
    return {
      id: pokemonFound.id,
      name: pokemonFound.name,
      image: pokemonFound.sprites.other['official-artwork'].front_default,
      hp: pokemonFound.stats[0].base_stat,
      attack: pokemonFound.stats[1].base_stat,
      defense: pokemonFound.stats[2].base_stat,
      speed: pokemonFound.stats[5].base_stat,
      height: pokemonFound.height,
      weight: pokemonFound.weight,
      types: pokemonFound.types.map((e) => ({ name: e.type.name })).map((e) => e.name),
      created: false,
    };
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



module.exports = {
  getAPI,
  getDB,
  getAll,
  searchByNameAPI,
  searchByIdAPI,
  getTypesHandler
}

