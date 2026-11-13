export function addToSelection(ids:number[],id:number,limit:number):number[]{return ids.includes(id)||ids.length>=limit?ids:[...ids,id]}
export function removeFromSelection(ids:number[],id:number):number[]{return ids.filter(value=>value!==id)}
type Ref={name:string;url:string};
type Filters={query:string;typeNames:Set<string>|null;generationNames:Set<string>|null;gameNames:Set<string>|null;favoriteIds:number[];favoritesOnly:boolean};
export function filterCatalog(rows:Ref[],f:Filters):Ref[]{const q=f.query.trim().toLowerCase();return rows.filter(p=>{const id=Number(p.url.split('/').filter(Boolean).pop());return (!q||p.name.includes(q)||String(id).includes(q))&&(!f.typeNames||f.typeNames.has(p.name))&&(!f.generationNames||f.generationNames.has(p.name))&&(!f.gameNames||f.gameNames.has(p.name))&&(!f.favoritesOnly||f.favoriteIds.includes(id))})}
