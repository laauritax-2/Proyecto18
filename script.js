// Guarda la dirección de búsqueda de GitHub.
const API = "https://api.github.com/search/repositories";

// Obtiene el menú de lenguajes del HTML.
const lenguaje = document.getElementById("lenguaje");

// Obtiene el botón de búsqueda.
const buscar = document.getElementById("buscar");

// Obtiene el espacio donde aparecen los resultados.
const resultado = document.getElementById("resultado");

// Escucha el clic y ejecuta la búsqueda.
buscar.addEventListener("click", async function () {
    // Lee el lenguaje que eligió el usuario.
    const valor = lenguaje.value;

    // Verifica que se haya elegido un lenguaje.
    if (valor === "") {
        // Pide seleccionar una opción.
        resultado.innerHTML = "<p>Selecciona un lenguaje primero.</p>";
        return; // Detiene la búsqueda.
    }

    // Informa que la búsqueda está en proceso.
    resultado.innerHTML = "<p>Buscando...</p>";

    try {
        // Consulta repositorios públicos del lenguaje elegido.
        const respuesta = await fetch(
            API + "?q=language:" + valor + "+is:public&per_page=100"
        );

        // Convierte la respuesta a formato JSON.
        const datos = await respuesta.json();

        // Comprueba si GitHub respondió correctamente.
        if (!respuesta.ok) {
            throw new Error("No se pudo consultar GitHub. Inténtalo más tarde.");
        }

        // Comprueba si hay repositorios disponibles.
        if (datos.items.length === 0) {
            resultado.innerHTML = "<p>No se encontraron repositorios.</p>";
            return; // Termina si no hay resultados.
        }

        // Calcula una posición aleatoria de la lista.
        const numero = Math.floor(Math.random() * datos.items.length);

        // Guarda el repositorio elegido.
        const repo = datos.items[numero];

        // Muestra el nombre y la descripción del repositorio.
        resultado.innerHTML = `
            <h2>📁 ${repo.full_name}</h2>
            <p>${repo.description || "Sin descripción."}</p>

            <div class="datos">
                <p>⭐ Estrellas: ${repo.stargazers_count}</p>
                <p>🍴 Forks: ${repo.forks_count}</p>
                <p>🐛 Issues abiertas: ${repo.open_issues_count}</p>
            </div>

            <a href="${repo.html_url}" target="_blank">🔗 Ver repositorio</a>
        `;
    } catch (error) {
        // Muestra un mensaje si ocurre un error.
        resultado.innerHTML = "<p>" + error.message + "</p>";
    }
});
