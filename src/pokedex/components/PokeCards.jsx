import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import './styles/PokeCards.scss'

function PokeCards ({ url, singlePokemon = null }) {
  const [pokemon, setPokemon] = useState({})

  useEffect(() => {
    if (url) {
      axios.get(url)
        .then(({ data }) => setPokemon(data))
    }
  }, [url])

  useEffect(() => {
    if (singlePokemon) {
      console.log('singlePokemon', singlePokemon)
      setPokemon(singlePokemon)
    }
  }, [singlePokemon])

  if (!pokemon) return <p>Escaneando Pokemon</p>

  const typesPokemon = pokemon?.types?.map(t => t.type.name)
  const [hp, attack, defense, ,
    , speed] = pokemon?.stats || []


  return (
    <Link to={`/Pokedex/${pokemon.name}`} className={`pokecard type--${typesPokemon?.[0]}`} >
      <div className='pokecard__header'>
        <img className='pokecard-img' src={pokemon?.sprites?.other['official-artwork']?.front_default} alt={pokemon?.name} />
      </div>
      <div className='pokecard-body'>
        <h1 className='pokecard-name' >{pokemon?.name}</h1>
        <h3 className='pokecard-types'>{typesPokemon?.join(' / ')}</h3>
        <p className='pokecard-types-label'>Types</p>
        <div className='pokecard-stats'>
          <div className='pokecard-stats-item'>hp:<span> {hp?.base_stat} </span> </div>
          <div className='pokecard-stats-item'>Attack: <span> {attack?.base_stat} </span> </div>
          <div className='pokecard-stats-item'>Defense: <span> {defense?.base_stat} </span> </div>
          <div className='pokecard-stats-item'>Speed: <span> {speed?.base_stat} </span> </div>
        </div>
      </div>
    </Link>
  )
}

export default PokeCards
