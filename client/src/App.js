import './App.css';
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import {Landing, Home, DetailPage, FormPage, NotFound, Contact} from './views/Constants';
import {Switch, Route, useLocation} from 'react-router-dom';
import NavBar from './components/NavBar';
import { getPokemons, getTypes } from "./redux/actions";

function App() {
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);


  return (
    <>
      {location.pathname!=='/' && <NavBar/> }
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/form' component={FormPage}/>
        <Route exact path='/detail/:id' component={DetailPage}/>
        <Route exact path='/contact' component={Contact}/>
        <Route component={NotFound}/>
      </Switch>

    </>
  );
}

export default App;
