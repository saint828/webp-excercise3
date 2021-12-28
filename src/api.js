export async function fetchPokemon(pokemon){
  const respons =await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
  const data=await respons.json();
  //console.log(data.name);
  //console.log(data);
  return data.sprites.front_default;
}
export async function fetchPokemonName(pokemon){
  const respons =await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
  const data=await respons.json();
  console.log(data);
  return data.name;
}