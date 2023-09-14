//Creamos un archivo llamado data, en donde tendremos la web que usaremos en las peticiones, y un límite a la cantidad de pokémons
//que nos devolverá la app
const URL = "https://pokeapi.co/api/v2/pokemon/";
const LIMIT = "?limit=50";

module.exports = { URL, LIMIT };
