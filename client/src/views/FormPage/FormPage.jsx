import './FormPage.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postPokemon } from '../../redux/actions';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import validate from './validate';
import { useHistory } from 'react-router';
import Header from '../../components/Header';
import HeaderImageDetail from '../../images/HeaderImageDetail.png';

export default function FormPage() {
  //---HOOKS---
  const dispatch = useDispatch();
  const { push } = useHistory();

  const { types } = useSelector((state) => ({
    types: state.types,
  }));
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: '',
    image: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    types: [],
  });

  //
  const DISABLEDSUBMIT =
    input.name === '' ||
    input.image === '' ||
    input.hp === '' ||
    input.attack === '' ||
    input.defense === '' ||
    input.speed === '' ||
    input.height === '' ||
    input.weight === '' ||
    errors.hasOwnProperty('name') ||
    errors.hasOwnProperty('image') ||
    errors.hasOwnProperty('hp') ||
    errors.hasOwnProperty('attack') ||
    errors.hasOwnProperty('defense') ||
    errors.hasOwnProperty('height') ||
    errors.hasOwnProperty('weight') ||
    errors.hasOwnProperty('types');

  const DISABLEDINPUT = input.types.length > 1 ? true : false;

  //---DELETE INPUTs---
  const handleDelete = (typeIn) => {
    setInput({
      ...input,
      types: input.types.filter((type) => type !== typeIn),
    });
  };

  //---FORM INPUTs---
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate(
        {
          ...input,
          [e.target.name]: e.target.value,
        },
        e.target.name,
      ),
    );
  };

  //---FORM SELECT---
  const handleSelect = (e) => {
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
  };

  //
  const handleOnClick = (e) => {
    setInput({
      name: '',
      image: '',
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
      types: [],
    });
  };

  //---FORM SUBMIT---
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("el boton funciona y agarró el valor: ", input);
    dispatch(postPokemon(input));
    alert('Pokemon ready! 🎉');
    push('/home');
    setInput({
      name: '',
      image: '',
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
      types: [],
    });
  };

  return (
    <>
      <NavBar />

      <Header title="Create your Pokémon" image={HeaderImageDetail}>
        You have caught a Pokémon that is not on the list. Create it and let the world know about him
      </Header>

     
<div className='container'>
  <h3 className='create__title'>Create Pokemon</h3>
  <div className='position'>
    <form className='container__form' onSubmit={handleSubmit}>
      <div className='labelInput_cnt'>
        <label>NAME</label>
        <input
          onChange={handleChange}
          type='text'
          value={input.name.toLowerCase()}
          name='name'
        />
        {errors.name && <p className='input-errors'>{errors.name}</p>}
      </div>
      <div className='labelInput_cnt'>
        <label>IMAGE</label>
        <input onChange={handleChange} type='text' value={input.image} name='image' />
        {errors.image && <p className='input-errors'>{errors.image}</p>}
      </div>
      <div className='labelInput_cnt'>
        <label>HP</label>
        <input onChange={handleChange} type='number' value={input.hp} name='hp' />
        {errors.hp && <p className='input-errors'>{errors.hp}</p>}
        <label>SPEED</label>
        <input onChange={handleChange} type='number' value={input.speed} name='speed' />
        {errors.speed && <p className='input-errors'>{errors.speed}</p>}
      </div>
      <div className='labelInput_cnt'>
        <label>ATTACK</label>
        <input onChange={handleChange} type='number' value={input.attack} name='attack' />
        {errors.attack && <p className='input-errors'>{errors.attack}</p>}
        <label>DEFENSE</label>
        <input onChange={handleChange} type='number' value={input.defense} name='defense' />
        {errors.defense && <p className='input-errors'>{errors.defense}</p>}
      </div>
      <div className='labelInput_cnt'>
        <label>HEIGHT</label>
        <input onChange={handleChange} type='number' value={input.height} name='height' />
        {errors.height && <p className='input-errors'>{errors.height}</p>}
        <label>WEIGHT</label>
        <input onChange={handleChange} type='number' value={input.weight} name='weight' />
        {errors.weight && <p className='input-errors'>{errors.weight}</p>}
      </div>
      <div className='create-cnt_btns'>
        <label>TYPES</label>
        <select disabled={DISABLEDINPUT} className='types-select' onChange={handleSelect}>
          <option value='none' disabled hidden>
            TYPES
          </option>
          {types?.map((e, i) => (
            <option key={i} value={e.name}>
              {e.name.toUpperCase()}
            </option>
          ))}
        </select>
        <button className={DISABLEDSUBMIT ? 'notClear' : 'btn sm'} type='submit'>
          Create Now!
        </button>
      </div>
    </form>
    <div className='position-btn'>
      {input.types?.map((typeIn, i) => (
        <div key={i}>
          <p style={{ display: 'inline-block' }}>{typeIn.toUpperCase()}</p>
          <button style={{ color: 'red' }} onClick={() => handleDelete(typeIn)}>
            clear
          </button>
        </div>
      ))}
    </div>
    <button className='btn sm' onClick={handleOnClick}>
      CLEAR ALL
    </button>
  </div>
</div>


      <Footer/>
      
    </>
  );
}
