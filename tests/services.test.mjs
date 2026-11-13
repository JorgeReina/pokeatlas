import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import { PokeApi } from '../src/app/data/poke-api.ts';
import { FavoritesStore } from '../src/app/data/favorites-store.ts';

test('concurrent requests share a response and cache subsequent requests',async()=>{let calls=0;const api=new PokeApi(async()=>{calls++;return {ok:true,json:async()=>({name:'pikachu'})}});const [a,b]=await Promise.all([api.get('pokemon/25'),api.get('pokemon/25')]);assert.equal(a.name,'pikachu');assert.deepEqual(b,a);await api.get('pokemon/25');assert.equal(calls,1)});
test('failed API request can be retried',async()=>{let calls=0;const api=new PokeApi(async()=>({ok:++calls>1,json:async()=>({ok:true})}));await assert.rejects(api.get('pokemon/25'));assert.deepEqual(await api.get('pokemon/25'),{ok:true});assert.equal(calls,2)});
test('favorites survive a new store and ignore invalid stored values',()=>{let data='[1,"x",25,25,-1]';const storage={getItem:()=>data,setItem:(_key,value)=>{data=value}};const first=new FavoritesStore(storage);assert.deepEqual(first.read(),[1,25]);first.toggle(4);assert.deepEqual(new FavoritesStore(storage).read(),[1,25,4]);first.toggle(1);assert.deepEqual(first.read(),[25,4])});
