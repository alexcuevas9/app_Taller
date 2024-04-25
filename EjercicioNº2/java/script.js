// Array que contiene las cartas disponibles para el juego: A, K, Q, J
const availableCards = ['A', 'K', 'Q', 'J'];

// Array vacío donde se almacenarán las cartas del juego
let cards = [];

// Array que almacena temporalmente las cartas seleccionadas por el jugador
let selectedCards = [];

// Array que almacena los valores utilizados para las cartas
let valuesUsed = [];

// Variable que lleva la cuenta del número de movimientos actuales
let currentMove = 0;

// Variable que lleva la cuenta del número de intentos actuales
let currentAttempts = 0;

// Cadena de texto que contiene el HTML para una carta en el juego
let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';

// Evento que inicia el juego cuando se hace clic en el botón 'startGame'
document.getElementById('startGame').addEventListener('click', startGame);

// Evento que reinicia el juego cuando se hace clic en el botón 'restartGame'
document.getElementById('restartGame').addEventListener('click', restartGame);

// Función que inicia el juego
function startGame() {
    // Obtiene la cantidad de cartas ingresada por el usuario
    const cardCount = parseInt(document.getElementById('cardCount').value);
    // Verifica si la cantidad de cartas está en el rango válido (entre 2 y 52)
    if (cardCount >= 2 && cardCount <= 52) {
        // Calcula el total de cartas necesarias para el juego
        totalCards = cardCount * 2;
        // Reinicia el juego
        resetGame();
        // Oculta el enunciado al iniciar el juego
        document.getElementById('instruction').style.display = 'none';
        // Oculta el botón de inicio
        document.getElementById('startGame').style.display = 'none';
        // Muestra el botón de reiniciar juego
        document.getElementById('restartGame').style.display = 'block';
        // Configura el juego
        setupGame();
    } else {
        // Muestra un mensaje de alerta si el número ingresado no es válido
        alert('Por favor, ingresa un número válido entre 2 y 52.');
    }
}

// Función que reinicia el juego
function resetGame() {
    // Reinicia las variables y elementos del juego
    currentMove = 0;
    currentAttempts = 0;
    selectedCards = [];
    valuesUsed = [];
    document.querySelector('#game').innerHTML = '';
    document.querySelector('#stats').innerHTML = '0 intentos';
    // Remueve la clase 'active' de todas las cartas
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('active');
    });
    // Limpia el array de cartas
    cards = [];
}

// Función que configura el juego
function setupGame() {
    // Itera para crear las cartas y configurar los eventos de clic
    for (let i = 0; i < totalCards; i++) {
        let div = document.createElement('div');
        div.innerHTML = cardTemplate;
        cards.push(div);
        document.querySelector('#game').append(cards[i]);
        randomValue();
        cards[i].querySelectorAll('.face')[0].innerHTML = getFaceValue(valuesUsed[i]);
        cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
    }
}

// Función que genera valores aleatorios para las cartas
function randomValue() {
    let rnd = Math.floor(Math.random() * totalCards * 0.5);
    let values = valuesUsed.filter(value => value === rnd);
    if (values.length < 2) {
        valuesUsed.push(rnd);
    } else {
        randomValue();
    }
}

// Función que obtiene el valor de la carta en función del índice del valor utilizado
function getFaceValue(value) {
    let rtn = value;
    if (value < availableCards.length) {
        rtn = availableCards[value];
    }
    return rtn;
}

// Función que reinicia el juego
function restartGame() {
    resetGame();
    // Muestra el enunciado al reiniciar
    document.getElementById('instruction').style.display = 'block';
    // Muestra el botón de inicio al reiniciar
    document.getElementById('startGame').style.display = 'block';
    // Oculta el botón de reiniciar juego al reiniciar
    document.getElementById('restartGame').style.display = 'none';
}

// Función que verifica si todas las cartas están emparejadas y muestra un mensaje de victoria
function checkVictory() {
    let matched = 0;
    document.querySelectorAll('.card').forEach(card => {
        if (card.classList.contains('active')) {
            matched++;
        }
    });
    if (matched === totalCards) {
        // Muestra un mensaje de victoria si todas las cartas están emparejadas
        alert('¡Felicidades! ¡Has encontrado todas las parejas!');
    }
}

// Función que se activa cuando se hace clic en una carta
function activate(e) {
    if (currentMove < 2) {
        if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active')) {
            // Añade la clase 'active' a la carta seleccionada
            e.target.classList.add('active');
            selectedCards.push(e.target);
            if (++currentMove == 2) {
                // Incrementa el número de intentos
                currentAttempts++;
                document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';
                if (selectedCards[0].querySelectorAll('.face')[0].innerHTML == selectedCards[1].querySelectorAll('.face')[0].innerHTML) {
                    // Si las cartas seleccionadas son iguales, reinicia el conteo de movimientos
                    selectedCards = [];
                    currentMove = 0;
                    // Verifica si todas las cartas están emparejadas
                    checkVictory();
                } else {
                    // Si las cartas seleccionadas no son iguales, las desactiva después de un tiempo
                    setTimeout(() => {
                        selectedCards[0].classList.remove('active');
                        selectedCards[1].classList.remove('active');
                        selectedCards = [];
                        currentMove = 0;
                    }, 600);
                }
            }
        }
    }
}




