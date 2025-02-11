import React from 'react'
import { useName } from '../hooks/useName' 
import { useRef } from 'react'
import { useNavigate } from 'react-router'
import './components/styles/Home.scss'
function Home() {
   const inputRef = useRef()
   const { setName} = useName()
   const navigate = useNavigate()

   const handleSetName = () => {
       if(!inputRef.current.value) {
        alert('Please enter your name')
        return
       }
       setName(inputRef.current.value)
        navigate('/Pokedex')
   }
  return (
    <div className='home'>
    <div className='home-title'><img src="././public/pokedex.svg" alt="logo" /></div>
    <div className='home-content'>
      <img className='home-title-img' src="./public/Profesor_Oak_LGPE.png" alt="Profesor" />
      <div className='home-right-content'>
        <h2 className='home-subtitle'>¡Hola Entrenador!</h2>
        <p className='home-name-text'>Para poder comenzar ingresa tu nombre</p>
        <input className='home-input' type="text" placeholder='Coloca tu nombre aquí' ref={inputRef} onKeyDown={(e) => e.key === 'Enter' && handleSetName()} />
        <button className='home-button' onClick={handleSetName}>Comenzar</button>
      </div>
    </div>
  </div>
  )
}

export default Home