// Declarando array
let amigos = [];

// Función de agregar amigos
function agregarAmigo() {
    let input = document.getElementById("amigo");
    let nuevoAmigo = input.value.trim(); //Trim elimina espacios extra

// Comprobar que no este vacio el input
    if (nuevoAmigo == "") {
        alert("Por favor ingresa un nombre antes de dar click en agregar");
        return;
    }
//Lista con los nombres
        amigos.push(nuevoAmigo);
        let listaAmigos = document.getElementById("listaAmigos");
        let item = document.createElement("li");
        item.textContent = nuevoAmigo;
        listaAmigos.appendChild(item);
        input.value = ""
    }

// Función para realizar el sorteo de amigo secreto
function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Necesitas al menos dos amigos para hacer el sorteo.");
        return;
    }

    const resultados = [];
    const amigosShuffled = [...amigos];  // Copiar el array para no modificar el original

    // Realizar el sorteo
    for (let i = 0; i < amigosShuffled.length; i++) {
        let amigo = amigosShuffled[i];
        let amigoSecreto = amigosShuffled[(i + 1) % amigosShuffled.length]; // El siguiente amigo en la lista
        resultados.push(`${amigo} le tocó a ${amigoSecreto}`);
    }

    // Mostrar los resultados en el HTML
    const resultadoLista = document.getElementById("resultado");
    resultadoLista.innerHTML = ''; // Limpiar resultados anteriores

    resultados.forEach(result => {
        const li = document.createElement("li");
        li.textContent = result;
        resultadoLista.appendChild(li);
    });
}
