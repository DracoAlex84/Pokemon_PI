import "./Cards.css";
import { NavLink } from "react-router-dom";
import { Card } from "../components/Card";


export const Cards = ({ isLoading, currentPokemons  }) => {
  return (
    <div className='cards_main'>
      {isLoading ? (
        <div className='loader_container'>
          <div className='wrapper'>
            <div className='pokeball'></div>
          </div>
        </div>
      ) : (
        <div className='cards_container'>
          {currentPokemons.length === 0 ? (
            <div>
              <h2>POKEMON NOT FOUND</h2>
              <p>
                but don´t worry, go to <NavLink to='/form'>CREATE</NavLink>
              </p>
            </div>
          ) : (
            currentPokemons?.map((e) => {
              return (
                <NavLink key={e.id} to={`/detail/${e.id}`}>
                  
                  <Card
                    id={e.id}
                    key={e.id}
                    name={e.name}
                    number={e.id}
                    image={e.image}
                    types={e.types}
                  />
              
                </NavLink>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
