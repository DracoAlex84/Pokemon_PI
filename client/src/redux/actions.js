import axios from 'axios';
import { URL, URL_T } from '../data';
import {useHistory} from 'react-router-dom'
import {
    SET_LOADING,
    GET_POKEMONS,
    GET_POKEMON_DETAIL,
    GET_POKEMON_NAME,
    GET_TYPES,
    FILTER_BY_TYPE,
    FILTER_BY_CREATOR,
    SORT_BY_NAME,
    SORT_BY_ATTACK,
    CLEAR_POKEMON,

} from '../redux/actionTypes'

export function getPokemons () {
    return (dispatch) => {
        dispatch({ type: SET_LOADING, payload: true });
        axios
          .get(`${URL}`)
          .then((res) => res.data)
          .then((pokemons) => {
            dispatch({ type: GET_POKEMONS, payload: pokemons });
            dispatch({ type: SET_LOADING, payload: false });
          })
          .catch((error) => console.log(error));
      };  
}

export function getPokemonDetail(idPokemon) {
  return (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    axios
      .get(`${URL}${idPokemon}`)
      .then((res) => res.data)
      .then((pokemon) => {
        dispatch({ type: GET_POKEMON_DETAIL, payload: pokemon });
        dispatch({ type: SET_LOADING, payload: false });
      })
      .catch((error) => console.log(error));
  };
}

export function getPokemonByName(name) {
  return (dispatch) =>
    axios
      .get(`${URL}?name=${name}`)
      .then((res) => res.data)
      .then((pokemon) => {
        dispatch({ type: GET_POKEMON_NAME, payload: pokemon });
      })
      .catch((error) => {
        alert(`
      "${name}" NOT FOUND.
      Please, try again.`);
        return console.log(error);
      });
}

export function getTypes() {
  return (dispatch) => {
    axios
      .get(`${URL_T}`)
      .then((res) => res.data)
      .then((pokemons) => {
        dispatch({ type: GET_TYPES, payload: pokemons });
      })
      .catch((error) => console.log(error));
  };
}

export function postPokemon(payload) {
  return (dispatch) => {
    axios
      .post(`${URL}`, payload)
      .then((res) => res.data)
      .then((pokemon) => {
        return pokemon;
      })
      .catch((error) => console.log(error));
  };
}

export function filterByType(payload) {
  return { type: FILTER_BY_TYPE, payload };
}

export function filterByCreator(payload) {
  return { type: FILTER_BY_CREATOR, payload };
}

export function sortByName(payload) {
  return { type: SORT_BY_NAME, payload };
}

export function sortByAttack(payload) {
  return { type: SORT_BY_ATTACK, payload };
}

export function clearPokemon(idPokemon) {
  const history = useHistory;
  return (dispatch)=>{
    axios
    .delete(`${URL}${idPokemon}`)
     .then((response)=>{
        console.log(response.data);
        dispatch({type:CLEAR_POKEMON, payload:idPokemon});
        history.push('/')
     })
     .catch((error) => console.log(error));
  }
}
