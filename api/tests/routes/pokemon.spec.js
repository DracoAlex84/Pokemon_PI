const app = require('../../src/app')
const request = require('supertest');
const {expect} = require('chai');


describe('--GET--',  ()=>{
    it('Should respond whit a list of Pokémons', async()=>{
        const response =  await request(app).get('/pokemons');

        expect(response.statusCode).to.equal(200);
    })
});


describe('--CREATE--', () => {
    it('It should create a new Pokémon',  async () => {
      const newPokemon = {
        name: 'Gigantamax Cinderace',
        image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/815_f2.png',
        hp: 100,
        attack: 50,
        defense: 30,
        speed: 70,
        height: 4,
        weight: 6,
        types: ['Fire']
      };
  
      const response =  await request(app)
        .post('/pokemons')
        .send(newPokemon);
  
      expect(response.statusCode).to.equal(201);
    });
  });
  
