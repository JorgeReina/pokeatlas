import { PokeApi } from './data/poke-api';
import { FavoritesStore } from './data/favorites-store';
import { Pokemon, Ref } from './models/pokemon';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({selector:'app-root',imports:[FormsModule],templateUrl:'./app.html',styleUrl:'./app.css'})
export class App {
  private readonly api = inject(PokeApi);
  private readonly favorites = inject(FavoritesStore);
  readonly Math = Math;
  readonly types = ['normal','fire','water','electric','grass','ice','fighting','poison','ground','flying','psychic','bug','rock','ghost','dragon','dark','steel','fairy'];
  readonly labels:Record<string,string>={normal:'Normal',fire:'Fuego',water:'Agua',electric:'Eléctrico',grass:'Planta',ice:'Hielo',fighting:'Lucha',poison:'Veneno',ground:'Tierra',flying:'Volador',psychic:'Psíquico',bug:'Bicho',rock:'Roca',ghost:'Fantasma',dragon:'Dragón',dark:'Siniestro',steel:'Acero',fairy:'Hada'};
  readonly statLabels:Record<string,string>={hp:'PS',attack:'Ataque',defense:'Defensa','special-attack':'At. especial','special-defense':'Def. especial',speed:'Velocidad'};
  list=signal<Ref[]>([]); cards=signal<Pokemon[]>([]); selected=signal<Pokemon|null>(null); description=signal(''); evolutions=signal<Ref[]>([]); weaknesses=signal<string[]>([]); loading=signal(true); error=signal(''); query=signal(''); type=signal(''); favoritesOnly=signal(false); page=signal(0); total=signal(0); favoriteIds=signal<number[]>(this.favorites.read()); typeNames=signal<Set<string>|null>(null);  private requestId=0; private typeRequestId=0; private searchTimer:ReturnType<typeof setTimeout>|undefined;
  favoriteCount=computed(()=>this.favoriteIds().length);
  constructor(){void this.init()}
  async init(){try{const result=await this.api.get<{results:Ref[]}>('https://pokeapi.co/api/v2/pokemon?limit=2000');this.list.set(result.results);await this.refresh()}catch{this.loading.set(false);this.error.set('No hemos podido conectar con la PokéAPI. Comprueba tu conexión y vuelve a intentarlo.')}}
  async refresh(){const request=++this.requestId;this.loading.set(true);this.error.set('');try{const q=this.query().trim().toLowerCase();const names=this.typeNames();const fav=this.favoriteIds();const filtered=this.list().filter(p=>{const id=Number(p.url.split('/').filter(Boolean).pop());return (!q||p.name.includes(q)||String(id).includes(q))&&(!names||names.has(p.name))&&(!this.favoritesOnly()||fav.includes(id))});this.total.set(filtered.length);const page=filtered.slice(this.page()*24,(this.page()+1)*24);const data=await Promise.all(page.map(p=>this.api.get<Pokemon>(p.url)));if(request===this.requestId){this.cards.set(data);this.loading.set(false)}}catch{if(request===this.requestId){this.loading.set(false);this.error.set('No se han podido cargar los Pokémon. Inténtalo de nuevo.')}}}
  async setType(value:string){const request=++this.typeRequestId;this.type.set(value);this.page.set(0);try{if(value){const d=await this.api.get<{pokemon:{pokemon:Ref}[]}>(`https://pokeapi.co/api/v2/type/${value}`);if(request!==this.typeRequestId)return;this.typeNames.set(new Set(d.pokemon.map(x=>x.pokemon.name)))}else this.typeNames.set(null);await this.refresh()}catch{this.error.set('No se ha podido cargar el filtro de tipo.')}}
  search(value:string){this.query.set(value);this.page.set(0);clearTimeout(this.searchTimer);this.searchTimer=setTimeout(()=>void this.refresh(),250)}
  setFavorites(value:boolean){this.favoritesOnly.set(value);this.page.set(0);void this.refresh()}
  toggleFavorite(p:Pokemon,event:Event){event.stopPropagation();const next=this.favorites.toggle(p.id,this.favoriteIds());this.favoriteIds.set(next);if(this.favoritesOnly())void this.refresh()}
  async select(p:Pokemon){this.selected.set(p);this.description.set('Cargando descripción…');this.evolutions.set([]);this.weaknesses.set([]);try{const species=await this.api.get<{flavor_text_entries:{flavor_text:string;language:Ref}[];evolution_chain:{url:string}}>(p.species.url);if(this.selected()?.id!==p.id)return;this.description.set(species.flavor_text_entries.find(x=>x.language.name==='es')?.flavor_text.replace(/\s+/g,' ')||'Descripción en español no disponible.');type Chain={species:Ref;evolves_to:Chain[]};const chain=await this.api.get<{chain:Chain}>(species.evolution_chain.url);const walk=(node:Chain):Ref[]=>[node.species,...node.evolves_to.flatMap(walk)];if(this.selected()?.id===p.id)this.evolutions.set(walk(chain.chain));const relations=await Promise.all(p.types.map(t=>this.api.get<{damage_relations:{double_damage_from:Ref[];half_damage_from:Ref[];no_damage_from:Ref[]}}>(t.type.url)));const multipliers=new Map<string,number>();for(const {damage_relations:r} of relations){for(const [key,factor] of [['double_damage_from',2],['half_damage_from',.5],['no_damage_from',0]] as const)for(const t of r[key])multipliers.set(t.name,(multipliers.get(t.name)??1)*factor)}if(this.selected()?.id===p.id)this.weaknesses.set([...multipliers].filter(([,v])=>v>1).map(([k])=>k))}catch{if(this.selected()?.id===p.id)this.description.set('Algunos detalles no están disponibles en este momento.')}}
  changePage(delta:number){this.page.update(n=>n+delta);void this.refresh();window.scrollTo({top:0,behavior:'smooth'})}
  image(p:Pokemon){return p.sprites.other?.['official-artwork']?.front_default||''}
}
