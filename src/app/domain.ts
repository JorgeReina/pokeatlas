export function matchesPokemon(p:{id:number;name:string;types:string[]}, query:string, type:string):boolean { const q=query.trim().toLowerCase(); return (!q || p.name.toLowerCase().includes(q) || String(p.id).includes(q)) && (!type || p.types.includes(type)); }
export function toggleFavorite(ids:number[], id:number):number[] { return ids.includes(id) ? ids.filter(x=>x!==id) : [...ids,id]; }
