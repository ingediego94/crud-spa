// SPA
// script to change of view according to SPA (Single Page Application).

const container = document.getElementById('content');

// Get the name of each view from 'hash'.
function getViewFromHash() {
  const hash = location.hash.slice(2); // Deleting "#/"
  return hash || 'inicio'; // Default view
}

// Dynamically loads the HTML view.
function loadView(nameOfView) {
  fetch(`views/${nameOfView}.html`)     // It's mandatory that 'views' it'll be the same name of the folder that contains the views in html, except index.html
    .then(res => {
      if (!res.ok) throw new Error(`No se pudo cargar la vista: ${nameOfView}`);
      return res.text();
    })
    .then(html => {
      container.innerHTML = html;

            // Ejecutar lógica específica de cada vista
      if (nameOfView === 'crearProducto') {
        initCrearProducto(); // Llamas una función definida en app.js
      }

      if (nameOfView === 'consultarProductos') {
        getProducts(); // Llama la función para listar productos
      }
      
    })
    .catch(err => {
      container.innerHTML = `<p>Error al cargar la vista "${nameOfView}"</p>`;
      console.error(err);
    });
}

// It listening changes in the hash (the user push back / foward )
window.addEventListener('hashchange', () => {
  const view = getViewFromHash();
  loadView(view);
});

// When the page loads for first time.
document.addEventListener('DOMContentLoaded', () => {
  const view = getViewFromHash();
  loadView(view);
});