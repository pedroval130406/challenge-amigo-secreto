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

// Función para seleccionar un amigo al azar y mostrar solo el último seleccionado
let ultimoNombre = ""; // Para guardar el último nombre sorteado

function seleccionarAmigo() {
    if (amigos.length === 0) {
        alert("No hay más amigos en la lista.");
        return;
    }

    // Seleccionar un índice al azar
    let indice = Math.floor(Math.random() * amigos.length);
    let amigoSeleccionado = amigos[indice];

    // Mostrar solo el último nombre seleccionado
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = `<p>${amigoSeleccionado}</p>`; // Se muestra solo el nombre

    // Eliminar el amigo seleccionado de la lista
    amigos.splice(indice, 1);

    // Actualizar la lista en pantalla
    actualizarLista();

    // Si era el último amigo, esperar antes de ocultar elementos
    if (amigos.length === 0) {
        setTimeout(() => {
            ocultarElementos();
        }, 5000); // Espera 2 segundos para que el usuario vea el último nombre
    }
}

function cambiarNombre() {
    if (ultimoNombre) {
        amigos.push(ultimoNombre); // Volver a agregar el último nombre
        actualizarLista(); // Actualizar la lista en pantalla
        seleccionarAmigo(); // Hacer un nuevo sorteo
    }
}

// Función para actualizar la lista de amigos en pantalla
function actualizarLista() {
    let listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = amigos.map(a => `<li>${a}</li>`).join('');
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
    container.innerHTML = `<button class="button-reset" onclick="reiniciarLista()">Reiniciar sorteo</button>`;
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
