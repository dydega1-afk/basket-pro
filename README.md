# Basket Pro 🏀

Una web de baloncesto en español, con tema negro/naranja, diseño adaptable a móvil, tarjetas de fundamentos, rutina de entrenamiento y minijuego de precisión de 30 segundos. Ilustraciones creadas con CSS; no requiere imágenes, fuentes ni servicios externos.

## Inicio rápido

1. Extrae **todo** el ZIP.
2. Abre una terminal dentro de `basket-pro` (donde está `package.json`).
3. Instala Node.js 22 o superior si aún no lo tienes.
4. Ejecuta:

```sh
npm ci
npm start
```

5. Abre http://localhost:3000. Para detener el servidor, usa Ctrl+C.

También puedes abrir `public/index.html` directamente: el diseño y el juego funcionan sin servidor. La persistencia del récord puede variar al abrir archivos locales; con Express y GitHub Pages se guarda en el almacenamiento del navegador cuando está disponible.

## Archivos

```text
basket-pro/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── game.js
├── .github/workflows/pages.yml
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

## Cómo jugar

Pulsa **Comenzar**. El indicador se mueve de lado a lado: pulsa **Tirar** cuando esté dentro de la zona naranja central. Cada acierto suma 2 puntos y cada lanzamiento tiene una pausa de 0,55 segundos. La ronda dura 30 segundos. Puedes jugar con ratón, pantalla táctil o con Espacio/Enter cuando el botón tiene el foco. **Reiniciar partida** devuelve la ronda al inicio y conserva el récord. El récord es local, no una clasificación compartida.

## Subir a GitHub

Crea un repositorio vacío llamado `basket-pro` en GitHub. Elige **Public** si quieres que cualquiera pueda verlo. Desde la carpeta del proyecto:

```sh
git init
git add .
git commit -m "Crear Basket Pro"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/basket-pro.git
git push -u origin main
```

Sustituye `TU_USUARIO` por tu usuario real. Se requiere Git y autenticación con tu cuenta. No subas `node_modules` ni el ZIP dentro del repositorio; sube los archivos extraídos, incluidas `.github` y `.gitignore`.

## Activar GitHub Pages

En el repositorio entra a **Settings → Pages → Build and deployment → Source → GitHub Actions**. Abre **Actions**, selecciona **Publicar Basket Pro en GitHub Pages** y pulsa **Run workflow** en la rama `main` (o sube un nuevo cambio a esa rama). Al terminar, Pages mostrará la dirección pública. El workflow publica la carpeta `public`, y las rutas relativas permiten alojar el sitio bajo el nombre del repositorio.

GitHub Pages sirve únicamente la web estática; **no ejecuta Express ni `/api/health`**. El juego funciona íntegramente en el navegador y no necesita esa API. Para ejecutar `app.js` en internet, utiliza un alojamiento compatible con Node.js, con instalación `npm ci`, inicio `npm start` y la variable `PORT` proporcionada por el alojamiento.

## Desarrollo y comprobación

```sh
npm run dev
npm run check
```

`dev` reinicia Express al cambiar archivos del servidor. Recarga el navegador para ver cambios en la web. `check` comprueba la sintaxis JavaScript. Con el servidor iniciado, http://localhost:3000/api/health devuelve el estado de la aplicación. El puerto predeterminado es 3000 y puede configurarse con la variable de entorno `PORT`.

Para personalizar: cambia textos en `public/index.html`, colores en las variables al inicio de `public/styles.css` y la lógica del minijuego en `public/game.js`.

Proyecto educativo independiente, sin afiliación con ligas o equipos oficiales.
