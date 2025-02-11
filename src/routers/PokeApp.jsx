import React from 'react'
import { Routes, Route } from 'react-router'
import Home from '../pokedex/Home.jsx'
import Pokedex from '../pokedex/Pokedex.jsx'
import Pokemon from '../pokedex/Pokemon.jsx'
import PokeProtectedRoute from './PokeProtectedRoute.jsx'
import PokePublicRoute from './PokePublicRoute.jsx'


function PokeApp() {
  return (
    <Routes>
      <Route path="/" element={<PokePublicRoute><Home /></PokePublicRoute>} />
      <Route path="/Pokedex" element={<PokeProtectedRoute/>} >
        <Route index element={<Pokedex/>}/>
        <Route path=":name" element={<Pokemon/>}/>
              </Route>
    </Routes>
  )
}

export default PokeApp
