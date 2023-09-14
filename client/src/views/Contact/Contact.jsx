import './Contact.css'
import {FaInstagram} from 'react-icons/fa';
import {BsLinkedin, BsGithub} from 'react-icons/bs';
import Header from '../../components/Header';
import HeaderContactImage from '../../images/HeaderContactImage.jpg'
import { Footer } from '../Constants';

const Contact = () => {
  return(
    <>

    <Header title="Get In Touch" image={HeaderContactImage}>
        If you want to know more about me and my work, you can find me on all these social media platforms
    </Header>

      <section className='contact'>
        <div className="container contact__container">
          <div className="contact__wrapper">
            <a href='https://www.instagram.com/draco_alexis/' target='_blank' rel='noreferrer noopener'><FaInstagram/></a>
            <a href='https://www.linkedin.com/in/alexis-roberto-palavecino-068973172/' target='_blank' rel='noreferrer noopener'><BsLinkedin/></a>
            <a href='https://github.com/DracoAlex84' target='_blank' rel='noreferrer noopener'><BsGithub/></a>
          </div>
        </div>
      </section>

    <Footer/>
    
    </>
  
  )
}

export default Contact