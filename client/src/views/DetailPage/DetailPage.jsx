import './DetailPage.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getPokemonDetail } from '../../redux/actions';
import NavBar from '../../components/NavBar';
import Header from '../../components/Header'
import HeaderImageDetail from '../../images/characterb_art.png'
import Footer from '../../components/Footer';

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { pokemonDetail } = useSelector((state) => ({
    pokemonDetail: state.pokemonDetail,
  }));


  const { name, image, hp, attack, defense, speed, height, weight, types } = pokemonDetail;

  const typeColors = {
    normal: '#a4acaf',
    fighting: '#d56723',
    flying: '#3dc7ef',
    grass: '#9bcc50',
    poison: '#b97fc9',
    fire: '#fd7d24',
    water: '#4592c4',
    bug: '#729f3f',
    electric: '#eed535',
    ground: '#ab9842 ',
    fairy: '#fdb9e9',
    psychic: '#f366b9',
    rock: '#a38c21',
    steel: '#9eb7b8',
    ice: '#51c4e7',
    ghost: '#7b62a3',
    dragon: '#53a4cf '
  }

  useEffect(() => {
    dispatch(getPokemonDetail(id));
  }, [dispatch, id]);

  return (
    <>
   
      <NavBar />

      <Header title="Know him before you train it" image={HeaderImageDetail}>
          Know the stats of your Pokémon so you can became a better trainer
      </Header>

      <div className='detail__container'>
        <div className='title__cnt'>
          <p className='title__name'>{name?.toUpperCase()} </p>
        </div>
        <div className='items__container'>
          {!image ? (
            <div className='img-detail'>
            </div>
          ) : (
            <img className='img-detail' src={image} alt={name} />
          )}

          <div className='detail-card'>
            <span className='detail-card_number'>{id.includes('-') ? 'created' : `#${id}`}</span>
            {''}
            <h3>Name: {name}</h3>
            <p>HP: {hp}</p>
            <div className='detail-spec_cnt'>
              <p>Attack: {attack}</p>
              <p>Defense: {defense}</p>
            </div>
            <div className='detail-spec_cnt'>
              <p>Height: {height}</p>
              <p>Weight: {weight}</p>
            </div>
            <p>Speed: {speed}</p>
            <div className='types'>
              {types?.map((type, index) => {
                const backgroundColor = typeColors[type] || 'gray'
                return (
                  <div className='detail__types' key={index} style={{backgroundColor}}>
                    <span>{type}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>
        <NavLink to='/home'>
          <button className='btn sm'>GO BACK</button>
        </NavLink>
      </div>
      
      <Footer/>
    </>
  );
}
