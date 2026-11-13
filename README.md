# PokéAtlas

Pokédex de fans construida con Angular y datos de PokéAPI. Permite buscar, filtrar por tipo, consultar fichas y guardar favoritos en el navegador. Proyecto no oficial y sin afiliación con Pokémon.

## Desarrollo

Requiere Node.js compatible con Angular 22 (22.22.3+, 24.15+ o 26). Ejecuta `npm install`, `npm start` y visita `http://localhost:4200`. Compila con `npm run build`.

Los datos se obtienen directamente de https://pokeapi.co/ y se almacenan en caché en memoria durante la sesión. Favoritos se guardan solo en el navegador. La información de encuentros y movimientos por juego sigue pendiente.

## Organización

`src/app/data` contiene el cliente de PokéAPI y el almacenamiento de favoritos; `src/app/models` define los tipos compartidos. El cliente reutiliza peticiones simultáneas y guarda las respuestas en memoria durante la sesión. El componente principal coordina la presentación; todavía quedan por separar la vista y la lógica de detalle.

Ejecuta `npm test` con Node.js 24.15 o superior para verificar la lógica de favoritos, caché y reintentos. La prueba usa el ejecutor de pruebas integrado de Node.

## Herramientas

El filtro de generación consulta las especies introducidas en ella. El filtro de juego usa las Pokédex vinculadas a su grupo de versiones; no indica dónde se captura cada Pokémon y depende de la cobertura de PokéAPI. Las formas alternativas pueden no aparecer en estos filtros.

El equipo admite hasta seis Pokémon distintos y se conserva en el navegador; sus debilidades solo tienen en cuenta tipos actuales, no habilidades ni otras mecánicas. El comparador muestra estadísticas base de hasta dos Pokémon y se reinicia al cerrar la página.

Para Vercel, la salida de compilación es `dist` y se usa Node.js 24. El archivo `vercel.json` configura las rutas de la aplicación.
