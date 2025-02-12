import React, { useEffect, useState } from 'react'
import { useName } from '../hooks/useName'
import axios from 'axios'
import PokeList from './components/PokeList'
import './components/styles/Pokedex.scss'
import PokeCards from './components/PokeCards'

const pokeApiData = 'https://pokeapi.co/api/v2'

function Pokedex () {
  const [search, setSearch] = useState('')
  const [pokemon, setPokemon] = useState([])
  const [filter, setFilter] = useState(pokemon)
  const [selectPokemon, setSelectPokemon] = useState('all')
  const [types, setTypes] = useState([])
  const [pokemonData, setPokemonData] = useState(null)
  const { name, clearName } = useName()

  // Obtener los primeros pokemons
  const getInitialPokemon = () => {
    axios
      .get(`${pokeApiData}/pokemon?limit=150`)
      .then(({ data }) => setPokemon(data.results))
    setPokemonData(null)
  }

  // Efecto para mostrar los primeros pokemons
  useEffect(() => {
    getInitialPokemon()
  }, [])

  // Efecto para el filtrado del input
  useEffect(() => {
    if (!search) {
      setFilter(pokemon)
      setPokemonData(null)
      return
    }

    setFilter(
      pokemon.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, pokemon])

  // Cargar los pokemons por tipo
  useEffect(() => {
    if (selectPokemon === 'all') {
      getInitialPokemon()
      return
    }
    axios
      .get(`${pokeApiData}/type/${selectPokemon}`)
      .then(({ data }) => {
        const tpokemon = data.pokemon.map(p => p.pokemon)
        setPokemon(tpokemon)
        setFilter(tpokemon)
        setPokemonData(null)
      })
  }, [selectPokemon])

  // Efecto para el filtro por tipo
  useEffect(() => {
    axios
      .get(`${pokeApiData}/type?limit=18`)
      .then(({ data }) => setTypes(data.results))
  }, [])

  const searchPokemon = () => {
    if (!search) {
      alert('Por favor ingresa un nombre de Pokémon')
      return
    }
    axios.get(`${pokeApiData}/pokemon/${search}`)
      .then(({ data }) => {
        if (selectPokemon !== 'all') {
          const isOfType = data.types.some(
            t => t.type.name === selectPokemon)
          if (!isOfType) {
            setPokemonData(null)
            alert('No hay pokemo de ese tipo')
            return
          }
        }
        setPokemonData(data)
      })
      .catch(e => {
        alert('Pokemon No encontrado')
        setPokemonData(null)
      })

  }

  return (
    <div className='pokedex'>
      <div className='pokedex-title'><img className='pokedex-title-img' src="../pokedex.svg" alt="logo" onClick={getInitialPokemon} /></div>
      {name &&
        <div className='pokedex-content'>
          <p className='pokedex-content-welcome'> ¡Bienvenido Entrenador {name}! </p>
          <button className='pokedex-btn-exit' onClick={clearName}>Exit</button>
        </div>}
      <input className='pokedex-input'
        type="text"
        placeholder="Ingresa el Nombre o Id"
        value={search}
        onChange={e => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && searchPokemon()}
      />
      <button className='pokedex-btn-search' onClick={searchPokemon}>Buscar</button>

      <select className='pokdex-select' value={selectPokemon} onChange={e =>
        setSelectPokemon(e.target.value)}>
        <option className='pokedex-select-option' value="all">All</option>
        {types.map(t => (
          <option className='pokedex-select-option' key={t.name} value={t.name}>
            {t.name}
          </option>
        ))}
      </select>

      {pokemonData && (
        <PokeCards singlePokemon={pokemonData} />
      )}


      <PokeList pokemon={filter} />
    </div>
  )
}

export default Pokedex
