import './NotFound.css';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';


const NotFound = () => {
  return (
    <>
      <section>
        <div className="container notFound__container">
          <h2>Page Not Found</h2>
          <Link to='/home' className='btn'>Go Back Home</Link>
        </div>
      </section>

      <Footer/>
    </>
  )
}

export default NotFound