let amigos = [];
let sesion = 1;
let ronda = 1;
let primeraVez = true;

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    if (nombre === "") {
        alert("Por favor, ingrese un nombre.");
        return;
    }

    amigos.push(nombre);
    actualizarLista();
    input.value = "";
}

function actualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo;

        // Botón de eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "❌";
        botonEliminar.style.marginLeft = "10px";
        botonEliminar.onclick = () => eliminarAmigo(index);

        li.appendChild(botonEliminar);
        lista.appendChild(li);
    });
}

function eliminarAmigo(index) {
    amigos.splice(index, 1); // Eliminar el amigo del array
    actualizarLista(); // Actualizar la lista en la interfaz
}

function seleccionarAmigo() {
    if (primeraVez && amigos.length < 2) {
        alert("Debe haber al menos 2 nombres en la lista para realizar el primer sorteo.");
        return;
    }

    if (amigos.length === 0) {
        mostrarMensajeFin(); // Muestra el mensaje final directamente si la lista está vacía
        return;
    }

    const indice = Math.floor(Math.random() * amigos.length);
    const nombreSorteado = amigos[indice];

    mostrarModal(nombreSorteado);
}

function mostrarModal(nombre) {
    const modal = document.getElementById("modal");
    const modalNombre = document.getElementById("modal-nombre");
    modalNombre.textContent = nombre;
    modal.style.display = "flex";
}

function cerrarModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

function descartarAmigo() {
    const modalNombre = document.getElementById("modal-nombre").textContent;

    // Eliminar el nombre seleccionado de la lista
    amigos = amigos.filter((amigo) => amigo !== modalNombre);
    actualizarLista();
    cerrarModal();

    if (amigos.length === 0) {
        mostrarMensajeFin();
    }
}

function confirmarAmigo() {
    const modalNombre = document.getElementById("modal-nombre").textContent;

    // Volver a agregar el nombre al final de la lista
    amigos = amigos.filter((amigo) => amigo !== modalNombre);
    amigos.push(modalNombre);
    actualizarLista();
    cerrarModal();

    ronda++;
    primeraVez = false;

    if (amigos.length === 0) {
        mostrarMensajeFin();
    }
}

function mostrarMensajeFin() {
    const mensajeFin = document.getElementById("mensaje-fin");
    const botonReiniciar = document.getElementById("botonReiniciarContainer");
    mensajeFin.style.display = "block";
    botonReiniciar.style.display = "flex";
}

function reiniciarLista() {
    amigos = [];
    sesion++;
    ronda = 1;
    primeraVez = true;

    const mensajeFin = document.getElementById("mensaje-fin");
    const botonReiniciar = document.getElementById("botonReiniciarContainer");
    mensajeFin.style.display = "none";
    botonReiniciar.style.display = "none";

    actualizarLista();
}
