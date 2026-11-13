import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { matchesPokemon, toggleFavorite } from '../src/app/domain.ts';
test('searches name or number and applies type together',()=>{let p={id:25,name:'pikachu',types:['electric']};assert.equal(matchesPokemon(p,'25','electric'),true);assert.equal(matchesPokemon(p,'pika','water'),false)});
test('toggles a favorite without mutating the original list',()=>{let original=[1];assert.deepEqual(toggleFavorite(original,25),[1,25]);assert.deepEqual(toggleFavorite([1,25],25),[1]);assert.deepEqual(original,[1])});
