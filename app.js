// Declarando array
let amigos = [];

// Función de agregar amigos
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
// Evento para detectar cuando se presiona Enter en el campo de texto
document.getElementById("amigo").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        agregarAmigo(); // Llamar a la función de agregarAmigo al presionar Enter
    }
});

let ultimoNombre = ""; // Para guardar el último nombre sorteado

function seleccionarAmigo() {
    if (amigos.length === 0) {
        alert("No hay más amigos en la lista.");
        return;
    }

    // Seleccionar un índice al azar
    let indice = Math.floor(Math.random() * amigos.length);
    let amigoSeleccionado = amigos[indice];

    // Guardamos el último nombre sorteado
    ultimoNombre = amigoSeleccionado;

    // Mostrar el nombre en el modal
    let modalNombre = document.getElementById("modal-nombre");
    modalNombre.textContent = amigoSeleccionado;

    // Mostrar el modal
    let modal = document.getElementById("modal");
    modal.style.display = "flex";  // Mostrar el modal
}

function confirmarAmigo() {
    // Si el nombre sorteado es el tuyo
    if (ultimoNombre === "Tu Nombre") {  // Aquí debes reemplazar "Tu Nombre" con el nombre real del usuario
        amigos.push(ultimoNombre); // Regresa el nombre a la lista
        actualizarLista();
    }
    ocultarModal();  // Ocultar el modal después de la elección
}

function descartarAmigo() {
    // Si el nombre no es el tuyo, lo descartamos
    amigos.splice(amigos.indexOf(ultimoNombre), 1);  // Elimina el último nombre sorteado de la lista
    actualizarLista();  // Actualiza la lista en pantalla
    ocultarModal();  // Ocultar el modal después de la elección
}

// Función para actualizar la lista de amigos en pantalla
function actualizarLista() {
    let listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = amigos.map(a => `<li>${a}</li>`).join('');
}

// Función para ocultar el modal
function ocultarModal() {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
}

// Función para ocultar todo y mostrar solo el botón de reinicio
function ocultarElementos() {
    // Ocultar la sección de agregar amigos y el banner
    document.querySelector(".input-section").style.display = "none"; 
    document.querySelector(".header-banner").style.display = "none"; 
    
    // Limpiar resultados y lista
    document.getElementById("resultado").innerHTML = ""; 
    document.getElementById("listaAmigos").innerHTML = ""; 

    // Asegurar que el contenedor del botón sea visible
    let container = document.getElementById("botonReiniciarContainer");
    container.style.display = "block"; 
}

// Función para reiniciar la lista
function reiniciarLista() {
    amigos = []; // Vaciar la lista de amigos

    // Restaurar los elementos a su estado original
    document.querySelector(".input-section").style.display = "flex"; // Volver a mostrar la sección
    document.querySelector(".header-banner").style.display = "flex"; // Mostrar el banner de nuevo

    // Limpiar la lista y el resultado
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";

    // Ocultar el botón de reinicio
    let container = document.getElementById("botonReiniciarContainer");
    container.style.display = "none"; // Ocultar el botón de reinicio
    container.innerHTML = "";

    // Restaurar el foco al campo de texto
    document.getElementById("amigo").focus();
}

function toggleLista() {
    let lista = document.getElementById("listaAmigos");
    let boton = document.getElementById("botonToggleLista");

    if (lista.style.display === "none") {
        lista.style.display = "block";
        boton.textContent = "Ocultar lista";
    } else {
        lista.style.display = "none";
        boton.textContent = "Mostrar lista";
    }
}
