import React from 'react'
import {  useParams, useNavigate } from 'react-router'
import { useState,useEffect } from 'react'
import axios from 'axios'
import './components/styles/Pokemon.scss'

function Pokemon() {
  const [pokemon, setPokemon]= useState({ })
  const params = useParams()
  const navigate = useNavigate()
  const pokeApiData = 'https://pokeapi.co/api/v2';

  const handleReturn = () => {
    navigate('/Pokedex')
  }

  useEffect(()=>{
    axios.get(`${pokeApiData}/pokemon/${params.name}`)
    .then(({data}) => setPokemon(data))}, [params.name])

  const typesPokemon = pokemon?.types?.map(t => t.type.name)
  const abilitiesPokemon = pokemon?.abilities?.map(a => a.ability.name)
  const [hp, attack,defense,specialAttack,
    specialDefense,speed] = pokemon?.stats || []
    return (
    <div className={`pokemon type--${typesPokemon?.[0]}`}>
    <div className="pokemon">
    <img className='pokemon-img' src={pokemon?.sprites?.other['official-artwork']?.front_default} alt={pokemon?.name} />
    <button onClick={handleReturn}>Return</button>
    <p className='pokemon-stats-id'>Id: #{pokemon.id}</p>
    <h1 className='pokemon-title' > {pokemon?.name} </h1>
    <p className='pokemon-stats-item'>Weight:{pokemon?.weight} </p>
    <p className='pokemon-stats-item'>Height:{pokemon?.height} </p>
    <p className='pokemon-stats-item'>Types: {typesPokemon?.join(' , ')} </p>
    <p className='pokemon-stats-item'>Abilities: {abilitiesPokemon?.join(' , ')} </p>
    <p className='pokemon-stats-item'>{hp?.stat.name}: <span>{hp?.base_stat}</span> </p>
    <p className='pokemon-stats-item'>{attack?.stat.name}: <span>{attack?.base_stat}</span></p>
    <p className='pokemon-stats-item'>{defense?.stat.name}: <span>{defense?.base_stat}</span></p>
    <p className='pokemon-stats-item'>{specialAttack?.stat.name}: <span>{specialAttack?.base_stat}</span></p>
    <p className='pokemon-stats-item'>{specialDefense?.stat.name}: <span>{specialDefense?.base_stat}</span></p>
    <p className='pokemon-stats-item'>{speed?.stat.name}: <span>{speed?.base_stat}</span></p>
    </div>
    <h2 className='pokemon-stats'>Movements</h2>
    <ul className='pokemon-stats-move' style={{listStyleType:'none'}}> 
      {pokemon?.moves?.map( (m, index) => <li className='pokemon-stats-move-list'  key={index}>{m.move.name}</li>)}
    </ul>
    </div>
  )
}

export default Pokemon