import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';
import {FaInstagram} from 'react-icons/fa';
import {BsLinkedin, BsGithub} from 'react-icons/bs';

const Footer = () => {
  return (
    <footer>
      <div className="container footer__container">
        <article>
          <Link to='/home'>
            <img src={Logo} alt='Footer Logo'/>
          </Link>
          <div className="footer__socials">
            <a href='https://www.instagram.com/draco_alexis/' target='_blank' rel='noreferrer noopener'><FaInstagram/></a>
            <a href='https://www.linkedin.com/in/alexis-roberto-palavecino-068973172/' target='_blank' rel='noreferrer noopener'><BsLinkedin/></a>
            <a href='https://github.com/DracoAlex84' target='_blank' rel='noreferrer noopener'><BsGithub/></a>
          </div>
        </article>

        <article>
          <h4>Permalinks</h4>
            <Link to='/contact'>Contact</Link>
            <Link to='/home'>Home</Link>
            <Link to='/form'>Form</Link>
        </article>

      </div>
      <div className="footer__copyright">
        <small>2023 ALEXIS PALAVECINO &copy; All Rights Reserved</small>
      </div>
    </footer>
  )
}

export default Footer