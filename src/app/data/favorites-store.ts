type StoragePort = Pick<Storage,'getItem'|'setItem'>;
export class FavoritesStore {
  private readonly storage:StoragePort | null;
  constructor(storage:StoragePort | null) { this.storage=storage; }
  read():number[]{try{const v=JSON.parse(this.storage?.getItem('pokeatlas:favorites')||'[]');return Array.isArray(v)?[...new Set<number>(v.filter(x=>Number.isInteger(x)&&x>0))]:[]}catch{return []}}
  toggle(id:number, current=this.read()):number[]{const next=current.includes(id)?current.filter(value=>value!==id):[...current,id];try{this.storage?.setItem('pokeatlas:favorites',JSON.stringify(next))}catch{}return next}
}
