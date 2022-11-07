import './styles.css';
import Button from '@mui/material/Button';
import { useState } from 'react';
import PokeCard from './Component/pokeCard';
import Pokemon from './pokemon.type';
import { Grid } from '@mui/material';

const App = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pokeApiUrl, setPokeApiUrl] = useState('https://pokeapi.co/api/v2/pokemon/');

  function fetchPokemon() {
    fetch(pokeApiUrl)
      .then((response) => response.json())
      .then((result) => {
        setPokemonList(pokemonList?.concat(result.results));
        setPokeApiUrl(result.next);
      });
  }

  return (
    <>
      <div className="App d-flex flex-column align-items-center">
        <img src="https://i.pinimg.com/originals/9e/39/23/9e3923825ba4a4fa967858f980b8460f.png" alt="Pokemon" className="image-container" />
        <Grid container spacing={2}>
          {pokemonList.map((pokemon, index) => (
            <PokeCard key={index} name={pokemon.name} url={pokemon.url} id={index + 1} />
          ))}
        </Grid>
        <Button className="m-2" variant="contained" onClick={fetchPokemon}>
          Load Pokemon
        </Button>
      </div>
    </>
  );
};

export default App;
