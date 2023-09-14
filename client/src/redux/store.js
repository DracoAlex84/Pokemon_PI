// //Redux nos va a felicitar un estado global, lo que es un objeto con información, y cualquier componente
// //podría hacer uso de ese estado. El estado global sólo puede ser modificado por el reducer
// //El reducer va a tener una action que sería el type (qué tiene que hacer), y una información que es el payload
// //Ej==>: type: GET_USERS, payload:[arr usuarios]
// //Las props son externas y es lo que recibin los componentes
// //Debemos importar createStore de redux
// //applyMiddleware y compose me permite hacer mejor al redux
// import {createStore, applyMiddleware, compose} from "redux";
// //Importamos el reducer
// import rootReducer from "./reducer";
// import thunkMiddleware from "redux-thunk";

import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducer';
import thunkMiddleware from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))
    );

export default store;