# PokéAtlas

Pokédex de fans construida con Angular y datos de PokéAPI. Permite buscar, filtrar por tipo, consultar fichas y guardar favoritos en el navegador. Proyecto no oficial y sin afiliación con Pokémon.

## Desarrollo

Requiere Node.js compatible con Angular 22 (22.22.3+, 24.15+ o 26). Ejecuta `npm install`, `npm start` y visita `http://localhost:4200`. Compila con `npm run build`.

Los datos se obtienen directamente de https://pokeapi.co/ y se almacenan en caché en memoria durante la sesión. Favoritos se guardan solo en el navegador. Los datos de encuentros, filtrado por generación y construcción de equipos son trabajo pendiente.

## Organización

`src/app/data` contiene el cliente de PokéAPI y el almacenamiento de favoritos; `src/app/models` define los tipos compartidos. El cliente reutiliza peticiones simultáneas y guarda las respuestas en memoria durante la sesión. El componente principal coordina la presentación; todavía quedan por separar la vista y la lógica de detalle.

Ejecuta `npm test` con Node.js 24.15 o superior para verificar la lógica de favoritos, caché y reintentos. La prueba usa el ejecutor de pruebas integrado de Node.
