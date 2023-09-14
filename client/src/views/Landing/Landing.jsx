import './Landing.css';
import React from 'react';
import {Link} from 'react-router-dom';


const Landing = () => {
  return (
    <>
      <div className="landing">
        <div className="container container__landing">
          <div className="landing__tittle">
            <h3>Become a Professional Pokemon Trainer!</h3>
          </div>
          <div className="landing__init">
            <Link to='/home' className='btn__landing'>Let's Begin!</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing