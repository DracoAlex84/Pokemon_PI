import { useState } from "react";
import "./NavBar.css";
import {Link, NavLink} from "react-router-dom";
import {MdOutlineCatchingPokemon} from "react-icons/md";
import Logo from "../images/logo.png"
import {CgClose} from 'react-icons/cg'

const NavBar = () => {

  const [isNavShowing, setIsNavShowing] = useState(false);
  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="logo" onClick={()=>setIsNavShowing(false)}>
          <img src={Logo} alt="Nav Logo"/>
        </Link>
        <ul className={`nav__links ${isNavShowing ? 'show__nav' : 'hide__nav'}`}>
          <li>
            <NavLink to="/home" className={({isActive})=> isActive ? 'active-nav': ''}
            onClick={()=>setIsNavShowing(previousState=>!previousState)}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/form" className={({isActive})=> isActive ? 'active-nav': ''}
            onClick={()=>setIsNavShowing(previousState=>!previousState)}>Form</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({isActive})=> isActive ? 'active-nav': ''}
            onClick={()=>setIsNavShowing(previousState=>!previousState)}>Contact</NavLink>
          </li>          
        </ul>
        <button className="nav__toogle-btn" onClick={()=>setIsNavShowing(previousState=>!previousState)}>
          {
            isNavShowing ? <CgClose/> : <MdOutlineCatchingPokemon/>
          }
          </button>
      </div>
    </nav>
  )
}

export default NavBar