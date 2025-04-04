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

let esPrimerSorteo = true; // Indica si es el primer sorteo de la temporada

function seleccionarAmigo() {
    // Si es el primer sorteo y hay menos de 2 amigos, no se permite el sorteo
    if (esPrimerSorteo && amigos.length < 2) {
        alert("Debe haber al menos 2 amigos en la lista para iniciar el sorteo.");
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
    modal.style.display = "flex";  

    // Desactivar la validación después del primer sorteo
    esPrimerSorteo = false;
}

function reiniciarLista() {
    amigos = [];  // Vaciar la lista de amigos
    actualizarLista(); // Limpiar la lista en la UI
    document.getElementById("mensajeFin").style.display = "none"; 
    document.getElementById("botonReiniciarContainer").style.display = "none";

    // Reiniciar la variable para la nueva temporada
    esPrimerSorteo = true;
}

function confirmarAmigo() {
    // Regresar el nombre a la lista sin duplicar
    if (!amigos.includes(ultimoNombre)) {
        amigos.push(ultimoNombre);
    }
    actualizarLista();

    // Seleccionar otro amigo directamente
    seleccionarAmigo();
}

// Función para actualizar la lista de amigos en pantalla
function actualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    
    amigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo;

        // Crear botón de eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "❌";
        botonEliminar.style.marginLeft = "10px";
        botonEliminar.onclick = () => eliminarAmigo(index);

        li.appendChild(botonEliminar);
        lista.appendChild(li);
    });
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

// Función para verificar si la lista está vacía y mostrar el mensaje de fin
function verificarListaVacia() {
    // Si la lista de amigos está vacía
    if (amigos.length === 0) {
        // Mostrar mensaje de finalización
        document.getElementById("mensajeFin").style.display = "block";

        // Mostrar el contenedor del mensaje adicional
        document.getElementById("mensaje-reinicio-container").style.display = "block";
        
        // Mostrar el contenedor del botón de reinicio
        const botonReiniciarContainer = document.getElementById("botonReiniciarContainer");
        botonReiniciarContainer.style.display = "flex";  // Mostrar el botón de reiniciar

        // Limpiar la lista de amigos y el resultado
        document.getElementById("listaAmigos").innerHTML = "";
        document.getElementById("resultado").innerHTML = "";

        // También podemos ocultar la sección de agregar amigos para que la pantalla quede más limpia
        document.querySelector(".input-section").style.display = "none";
        document.querySelector(".header-banner").style.display = "none";
    }
}

// Llamar a esta función después de que se elimine un amigo o en otros eventos relevantes
function descartarAmigo() {
    let index = amigos.indexOf(ultimoNombre);
    if (index !== -1) {
        amigos.splice(index, 1);  // Eliminar el nombre sorteado de la lista
    }

    // Actualizar la lista en pantalla
    actualizarLista();
    
    // Ocultar el modal y verificar si la lista está vacía
    ocultarModal();
    
    // Verificar si la lista se vació
    verificarListaVacia();
}

function reiniciarLista() {
    location.reload(); // Recarga la página, restableciendo todo
}

function mostrarMensajeFin() {
    // Muestra el mensaje de que los sorteos han terminado
    document.getElementById('mensaje-acabado').style.display = 'block';
    document.getElementById('botonReiniciarContainer').style.display = 'flex'; // Mostrar el botón de reiniciar
}

function eliminarAmigo(index) {
    amigos.splice(index, 1); // Eliminar el amigo del array
    amigos = amigos.filter(Boolean); // Filtrar elementos vacíos del array
    actualizarLista(); // Actualizar la lista en la interfaz
}