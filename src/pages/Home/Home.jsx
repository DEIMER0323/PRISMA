import React from 'react'
import { useDispatch } from 'react-redux'
import { actionLogout } from '../../Redux/userAuth/userAuthActions';
import './home.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  return (
    <div className='home'>Home
    <button onClick={()=>dispatch(actionLogout)}>cerrar sesion </button>
    <Link to={"/agregar-movimiento"}>Agregar movimiento</Link>
    </div>
  )
}

export default Home