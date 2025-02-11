import React from 'react'
import PokeCards from './PokeCards'
import './styles/PokeList.scss'

function PokeList({pokemon} ) {
  return (
    <div className='pokelist'>
      {pokemon.map(p =>
        <PokeCards
        key={p.name}
        url = {p.url}
        />
      )}
    </div>
  )
}

export default PokeList
