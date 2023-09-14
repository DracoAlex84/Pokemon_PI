import './Search.css';
import React from 'react';

import { CgSearchLoading } from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import { getPokemons } from '../redux/actions';

function Search({ search, handleOnChange, handleOnClick, setSelected }) {
  const dispatch = useDispatch();

  const handleOnClickAll = (e) => {
    e.preventDefault();
    setSelected(true);
    dispatch(getPokemons());
  };

  return (
    <form className='search_container'>

      <h4>NAME OR NUMBER</h4>
      
      <input
        className='search-input'
        onChange={handleOnChange}
        name='search'
        value={search}
      ></input>

      <button className='btn__search' type='submit' onClick={handleOnClick}>
        <span>
          <CgSearchLoading />
        </span>
      </button>
      <div>
        <button className='btn__reset' onClick={handleOnClickAll}>
          RESET
        </button>
      </div>
    </form>
  );
}

export default Search;
