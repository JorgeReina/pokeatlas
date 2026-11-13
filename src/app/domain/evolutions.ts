type SpeciesRef={name:string;url:string};
export function evolutionArtwork(species:SpeciesRef):string|null { const match=species.url.match(/\/pokemon-species\/(\d+)\/?$/);return match?`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${match[1]}.png`:null; }
export function evolutionPokemonUrl(species:SpeciesRef):string { return `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(species.name)}`; }
