// Lista de amigos
let amigos = [];
let ultimoNombre = ""; // Para almacenar el último nombre sorteado

// Función para agregar amigos
function agregarAmigo() {
    let input = document.getElementById("amigo");
    let nuevoAmigo = input.value.trim();

    if (nuevoAmigo === "") {
        alert("Por favor, ingrese un nombre válido.");
        return;
    }

    if (amigos.includes(nuevoAmigo)) {
        alert("Ese amigo ya está en la lista.");
        return;
    }

    amigos.push(nuevoAmigo);
    actualizarLista();
    input.value = '';
}

// Función para seleccionar un amigo al azar y mostrarlo en el modal
function seleccionarAmigo() {
    if (amigos.length === 0) {
        alert("No hay amigos en la lista.");
        return;
    }

    let nombreSorteado = obtenerNombreAleatorio();
    if (!nombreSorteado) return; // Si no hay más nombres, detener la función

    let modalNombre = document.getElementById("modal-nombre");
    modalNombre.textContent = nombreSorteado;

    let modal = document.getElementById("modal");
    modal.style.display = "flex";
}

// Función para obtener un nombre aleatorio sin repetir el anterior inmediatamente
function obtenerNombreAleatorio() {
    if (amigos.length === 0) return null;

    let nombresDisponibles = amigos.filter(nombre => nombre !== ultimoNombre);
    if (nombresDisponibles.length === 0) return null;

    let indice = Math.floor(Math.random() * nombresDisponibles.length);
    let nuevoNombre = nombresDisponibles[indice];

    ultimoNombre = nuevoNombre;
    return nuevoNombre;
}

// Función que cambia el nombre sin cerrar el modal al hacer clic en "Soy yo"
function confirmarAmigo() {
    let nuevoNombre = obtenerNombreAleatorio();
    if (!nuevoNombre) {
        alert("No hay más nombres disponibles.");
        return;
    }

    let modalNombre = document.getElementById("modal-nombre");
    modalNombre.textContent = nuevoNombre;
}

// Función que cierra el modal al hacer clic en "No soy yo"
function descartarAmigo() {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
}

// Función para actualizar la lista en pantalla
function actualizarLista() {
    let listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = amigos.map(a => `<li>${a}</li>`).join('');
}

// Evento para agregar amigos al presionar Enter
document.getElementById("amigo").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        agregarAmigo();
    }
});

// Asignar eventos a los botones del modal
document.getElementById("botonAceptar").addEventListener("click", confirmarAmigo);
document.getElementById("botonDescartar").addEventListener("click", descartarAmigo);
