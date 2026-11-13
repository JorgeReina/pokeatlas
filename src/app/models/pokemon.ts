export interface Ref { name:string; url:string }
export interface Pokemon { species:Ref; id:number; name:string; types:{type:Ref}[]; stats:{base_stat:number;stat:Ref}[]; height:number; weight:number; sprites:{other?:{'official-artwork'?:{front_default:string|null}}}; abilities:{ability:Ref}[] }
