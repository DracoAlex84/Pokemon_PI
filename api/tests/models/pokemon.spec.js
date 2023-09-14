//Accedemos al modelo (Pokemon)
const { Type } = require('../../src/db.js');

//Agrupamos las pruebas con describe
describe('--TYPE  MODEL--', () => {
  //Con it definimos una prueba específica, en este caso de que exista un tipo de Pokémon, con la función done como argumento, 
  // que finaliza la prueba
      it('should throw an error if it does not have a type', (done) => {
        //Intenta crear un Pokémon con un objeto vacío
        Type.create({})
        //Si la creación es exitosa arroja un error que finaliza la prueba
          .then(() => done(new Error('It requires a valid type')))
        //Si hay un error en la creación finaliza la prueba
          .catch(() => done());
      });
      //Debe funcionar si se crea un tipo válido 
      it('should work when its a valid type', () => {
        Type.create({ name: 'Dragon' });
      });
});

