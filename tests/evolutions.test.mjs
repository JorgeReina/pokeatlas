import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {evolutionArtwork, evolutionPokemonUrl} from '../src/app/domain/evolutions.ts';
test('uses the species ID for artwork while navigating by species name',()=>{const species={name:'ivysaur',url:'https://pokeapi.co/api/v2/pokemon-species/2/'};assert.equal(evolutionArtwork(species),'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png');assert.equal(evolutionPokemonUrl(species),'https://pokeapi.co/api/v2/pokemon/ivysaur')});
test('does not create an artwork URL for an invalid species reference',()=>{assert.equal(evolutionArtwork({name:'x',url:'https://pokeapi.co/api/v2/pokemon-species/invalid/'}),null)});
