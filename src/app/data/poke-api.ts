type Fetcher = (url:string) => Promise<{ok:boolean;json():Promise<unknown>}>;
export class PokeApi {
  private readonly cache = new Map<string, Promise<unknown>>();
  private readonly fetcher:Fetcher;
  constructor(fetcher:Fetcher = url => fetch(url)) { this.fetcher=fetcher; }
  get<T>(path:string):Promise<T> {
    const url = path.startsWith('https://') ? path : `https://pokeapi.co/api/v2/${path}`;
    const cached=this.cache.get(url); if(cached) return cached as Promise<T>;
    const request=this.fetcher(url).then(response=>{if(!response.ok)throw new Error('No se pudo consultar la PokéAPI');return response.json()}).catch(error=>{this.cache.delete(url);throw error});
    this.cache.set(url,request);return request as Promise<T>;
  }
}
