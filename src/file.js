// src/PokeAPI.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './file.css';

const PokeAPI = () => {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20')
      .then(response => {
        const fetches = response.data.results.map(p => axios.get(p.url));
        Promise.all(fetches).then(responses => {
          setPokemon(responses.map(r => r.data));
        });
      });
  }, []);

  const handleSearch = event => {
    setSearch(event.target.value);
  };

  const filteredPokemon = pokemon.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Pokemon List</h1>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={search}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="pokemon-list">
        {filteredPokemon.map(p => (
          <div key={p.id} className="pokemon-card">
            <img src={p.sprites.front_default} alt={p.name} />
            <h3>{p.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokeAPI;
