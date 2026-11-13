import { PokeApi } from './data/poke-api';
import { FavoritesStore } from './data/favorites-store';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: PokeApi, useFactory: () => new PokeApi() },
    { provide: FavoritesStore, useFactory: () => { try { return new FavoritesStore(globalThis.localStorage); } catch { return new FavoritesStore(null); } } }
  ]
};
