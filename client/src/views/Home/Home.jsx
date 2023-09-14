import './Home.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../../components/Search';
import Pagination from '../../components/Pagination';
import Buttons from '../../components/Buttons';
import { Cards } from '../../components/Cards';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import heroimg from '../../images/hero-img.png';

import {
  clearPokemon,
  filterByCreator,
  filterByType,
  getPokemonByName,
  sortByAttack,
  sortByName,
} from '../../redux/actions';

export default function Home() {
  //--- STATES ---
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);
  const [cardPerPage] = useState(12);

  const { pokemons, isLoading } = useSelector((state) => ({
    pokemons: state.pokemons,
    isLoading: state.isLoading,
  }));

  //--- RESET ---
  const [selected, setSelected] = useState();


  useEffect(() => {
    setPage(1);
    dispatch(clearPokemon());
  }, [pokemons, dispatch]);

  //--- PAGINATION ---
  const indexLast = page * cardPerPage; //
  const indexFirst = indexLast - cardPerPage; //
  const currentPokemons = pokemons.slice(indexFirst, indexLast);

  const pagination = (pageNumber) => {
    setPage(pageNumber);
  };

  //--- SORTS ---
  function handleOnSortByName(e) {
    e.preventDefault();
    setSelected(false);
    dispatch(sortByName(e.target.value));
  }

  function handleOnSortByAttack(e) {
    e.preventDefault();
    setSelected(false);
    dispatch(sortByAttack(e.target.value));
  }

  //--- FILTERS ---
  function handleOnFilterByType(e) {
    e.preventDefault();
    setSelected(false);
    dispatch(filterByType(e.target.value));
  }

  function handleOnFilterByCreator(e) {
    e.preventDefault();
    setSelected(false);
    dispatch(filterByCreator(e.target.value));
  }

  //--- SEARCH ---
  function handleOnChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  function handleOnClickSearch(e) {
    e.preventDefault();
    dispatch(getPokemonByName(search));
    setSearch('');
  }

  const handleDeletePokemon = async (idPokemon) => {
    await dispatch(clearPokemon(idPokemon));
    alert('Pokémon deleted successfully!')
  };

  //--- RENDER ---
  return (
    <>
      <NavBar />
      
      <Header title="Search your Pokémon" image={heroimg}>
          Get to know all the Pokemons and become a Pokémon trainer
      </Header>

      <div className='home_container'>
        <div className='searchButtons_container'>
          <Search
            search={search}
            handleOnChange={handleOnChange}
            handleOnClick={handleOnClickSearch}
            setSelected={setSelected}
          />
          <Buttons
            handleOnSortByName={handleOnSortByName}
            handleOnSortByAttack={handleOnSortByAttack}
            handleOnFilterByType={handleOnFilterByType}
            handleOnFilterByCreator={handleOnFilterByCreator}
            setSelected={setSelected}
            selected={selected}
          />
        </div>
        <Cards isLoading={isLoading} currentPokemons={currentPokemons} handleDeletePokemon={handleDeletePokemon}/>
        <div className='searchButtons_container'>
          <Pagination
            page={page}
            cardPerPage={cardPerPage}
            pokemons={pokemons.length}
            pagination={pagination}
          ></Pagination>
        </div>
      </div>

      <Footer/>

    </>
  );
}
