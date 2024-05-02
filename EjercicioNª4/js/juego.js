String.prototype.replaceAt = function (index, character) { return this.substring(0, index) + character + this.substring(index + character.length); }

//conjunto de palabras para el juego
const button = document.querySelector('#calcular');//asignando button a boton calcular
const palabras = ['javascript', 'html', 'css', 'python', 'java','php','c++'];
//palabra randon
let palabra = palabras[Math.floor(Math.random() * palabras.length)];
//remplazar las palabras por guion y espacio
let palabraConGuiones = palabra.replace(/./g, "_ ");

let contadorFallos = 0;
//<p> id output sera reemplazado por "palabraConGuiones"
document.querySelector('#output').innerHTML = palabraConGuiones;

button.addEventListener('click', () => {
    //obtener el valor de la letra ingresada en id letra y guardarlo en la const letra.
    let letra = document.querySelector('#letra').value;
    letra = letra.toLowerCase();
    let haFallado = true;
    for (const i in palabra) {
        //si encuentra la letra, reemplazara el guión+espacio por la letra que encontro en el espacio en que lo encontro.
        if (letra == palabra[i]) {
            palabraConGuiones = palabraConGuiones.replaceAt(i * 2, letra);
            haFallado = false;
        }
    }
    /* condición de ganador o perdedor */
    if (haFallado) {
        contadorFallos++;
        document.querySelector('#ahorcado').style.backgroundPosition = -(180 * contadorFallos) + 'px 0px';
        if (contadorFallos > 2) {
            document.querySelector('#ahorcado').style.backgroundPosition = -(198 * contadorFallos) + 'px 220px';
        }
        if (contadorFallos >= 5) {
            document.querySelector('#resultado').innerHTML = "Perdiste, has sido ahorcado.";
            document.getElementById('resultado').style.backgroundColor = "#740707";
            button.disabled = true;
            setTimeout(resetGame, 1200); // Llama a la función para reiniciar el juego después de 1.2 segundo
        }
    } else {
        if (palabraConGuiones.indexOf('_') < 0) {
            document.querySelector('#resultado').innerHTML = "¡¡Eres un Ganador!!";
            document.getElementById('resultado').style.backgroundColor = "#0c5ca7";
            setTimeout(resetGame, 1200); // Llama a la función para reiniciar el juego después de 1.2 segundo
            button.disabled = true;
        }
    }

    /* document.querySelector('#ahorcado').style.backgroundPosition= -(100*contadorFallos)+'px'; */
    /* reemplazar los datos de id output por la variable palabra con guiones */
    document.querySelector('#output').innerHTML = palabraConGuiones;
    limpiarInput(); // Llama a la función para limpiar el campo de entrada
});
// Función para limpiar el campo de entrada
function limpiarInput() {
    document.querySelector('#letra').value = ''; // Establece el valor del campo de entrada a una cadena vacía
}
function resetGame() { // Función para reiniciar el juego
    document.querySelector('#letra').value = ''; // Limpia el campo de entrada
    palabra = palabras[Math.floor(Math.random() * palabras.length)]; // Selecciona una nueva palabra
    palabraConGuiones = palabra.replace(/./g, "_ "); // Reinicia la palabra con guiones
    contadorFallos = 0; // Reinicia el contador de fallos
    document.querySelector('#ahorcado').style.backgroundPosition = '0px 0px'; // Reinicia la posición del ahorcado
    document.querySelector('#output').innerHTML = palabraConGuiones; // Actualiza la palabra con guiones en la pantalla
    document.querySelector('#resultado').innerHTML = ''; // Limpia el resultado anterior
    document.getElementById('resultado').style.backgroundColor = 'initial'; // Reinicia el color de fondo del resultado
    document.querySelector('#calcular').disabled = false; // Habilita el botón calcular
}
