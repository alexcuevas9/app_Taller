const palabras = ['javascript', 'html', 'css', 'python', 'java'];

// Elige una palabra aleatoria del array 'palabras'
let palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];

// Define el número máximo de intentos
let intentos = 6;

// Crea una cadena de guiones bajos (_) con la misma longitud que la palabra secreta
let palabraMostrada = '_'.repeat(palabraSecreta.length);

// Muestra la palabra oculta y el número de intentos restantes en el HTML
document.getElementById('palabra').innerText = palabraMostrada;
document.getElementById('intentos').innerText = `Intentos restantes: ${intentos}`;

// Función para jugar, se llama cuando el jugador presiona el botón de "Jugar"
function jugar() {
    // Obtiene la letra ingresada por el jugador y la convierte a minúsculas
    const letra = document.getElementById('letra').value.toLowerCase();
    
    // Verifica si la entrada es una letra válida
    if (letra.length !== 1 || !(/[a-z]/.test(letra))) {
        alert('Ingresa una letra válida.');
        return;
    }

    // Verifica si la letra ingresada está en la palabra secreta
    if (palabraSecreta.includes(letra)) {
        // Reemplaza los guiones bajos (_) en la palabra mostrada por la letra correcta
        for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra) {
                palabraMostrada = palabraMostrada.substr(0, i) + letra + palabraMostrada.substr(i + 1);
            }
        }
        // Muestra la palabra actualizada en el HTML
        document.getElementById('palabra').innerText = palabraMostrada;
    } else {
        // Reduce el número de intentos restantes si la letra no está en la palabra secreta
        intentos--;
        // Actualiza el contador de intentos restantes en el HTML
        document.getElementById('intentos').innerText = `Intentos restantes: ${intentos}`;
    }

    // Verifica si el jugador ha perdido
    if (intentos === 0) {
        alert('¡Has perdido! La palabra era: ' + palabraSecreta);
        // Reinicia el juego
        reiniciarJuego();
    } 
    // Verifica si el jugador ha adivinado todas las letras de la palabra
    else if (!palabraMostrada.includes('_')) {
        alert('¡Felicidades! Has adivinado la palabra.');
        // Reinicia el juego
        reiniciarJuego();
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Elige una nueva palabra secreta aleatoria
    palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
    // Restablece el número de intentos
    intentos = 6;
    // Crea una nueva palabra mostrada con guiones bajos (_) para la nueva palabra secreta
    palabraMostrada = '_'.repeat(palabraSecreta.length);
    // Muestra la nueva palabra oculta y el número de intentos restantes en el HTML
    document.getElementById('palabra').innerText = palabraMostrada;
    document.getElementById('intentos').innerText = `Intentos restantes: ${intentos}`;
    // Limpia el campo de entrada de letras
    document.getElementById('letra').value = '';
}

