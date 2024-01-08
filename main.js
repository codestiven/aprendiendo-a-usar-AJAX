let page = 1;
let isLoading = false;
const response = document.getElementById("response");
const loader = document.getElementById("loader");


function cargarPersonajes() {
  if (isLoading) return;
  isLoading = true;

  loader.style.display = "block";

  fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then((respuesta) => respuesta.json())
    .then((data) => {
      renderizarPersonajes(data.results);
      page++;
    })
    .catch((error) => {
      console.error("Error al cargar personajes:", error);
    })
    .finally(() => {
      isLoading = false;
      loader.style.display = "none";
      response.classList.add("loaded");
    });
}

function renderizarPersonajes(personajes) {
  const fragment = document.createDocumentFragment();

  personajes.forEach((element) => {
    const imagen = new Image();
    imagen.src = element.image;
    imagen.alt = element.name;
    imagen.addEventListener("load", function () {
      response.appendChild(imagen);
    });
    imagen.addEventListener("error", function () {
      console.error("Error al cargar la imagen:", imagen.src);
    });
  });

  response.appendChild(fragment);
}


function estaEnElFondo() {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight;
}


window.addEventListener("scroll", function () {
  // Verificar si el scroll está en el fondo y no hay una carga en curso
  if (estaEnElFondo() && !isLoading) {
    cargarPersonajes();
  }
});



cargarPersonajes();
