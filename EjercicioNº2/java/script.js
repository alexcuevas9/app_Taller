const availableCards = ['A', 'K', 'Q', 'J']; 
let cards = []; //Es un array vacío donde se almacenarán las cartas del juego.
let selectedCards = []; //almacena temporalmente las cartas seleccionadas por el jugador.
let valuesUsed = []; //almacena los valores utilizados para las cartas.
let currentMove = 0; //variable que llevará la cuenta del número de movimientos actuales.
let currentAttempts = 0; //Variable que llevará la cuenta del número de intentos actuales.

let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';
//cadena de texto que contiene el HTML para una carta en el juego.

document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('restartGame').addEventListener('click', restartGame); 
//eventospara ejecutar ciertas funciones cuando se hace clic en los elementos

function startGame() {
    const cardCount = parseInt(document.getElementById('cardCount').value);
    if (cardCount >= 2 && cardCount <= 52) {
        totalCards = cardCount * 2;
        resetGame();
        document.getElementById('instruction').style.display = 'none'; // Oculta el enunciado al iniciar el juego
        document.getElementById('startGame').style.display = 'none'; // Oculta el botón de inicio
        document.getElementById('restartGame').style.display = 'block'; // Muestra el botón de reiniciar juego
        setupGame();
    } else {
        alert('Por favor, ingresa un número válido entre 2 y 52.');
    }
}

function resetGame() {
   currentMove = 0;
   currentAttempts = 0;
   selectedCards = [];
   valuesUsed = [];
   document.querySelector('#game').innerHTML = '';
   document.querySelector('#stats').innerHTML = '0 intentos';

   // Remover la clase 'active' de todas las cartas
   document.querySelectorAll('.card').forEach(card => {
       card.classList.remove('active');
   });

   // Limpiar el array de cartas
   cards = [];
}


function setupGame() {
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

function activate(e) {
    if (currentMove < 2) {
        if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active')) {
            e.target.classList.add('active');
            selectedCards.push(e.target);

            if (++currentMove == 2) {
                currentAttempts++;
                document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';

                if (selectedCards[0].querySelectorAll('.face')[0].innerHTML == selectedCards[1].querySelectorAll('.face')[0].innerHTML) {
                    selectedCards = [];
                    currentMove = 0;
                } else {
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

function randomValue() {
    let rnd = Math.floor(Math.random() * totalCards * 0.5);
    let values = valuesUsed.filter(value => value === rnd);
    if (values.length < 2) {
        valuesUsed.push(rnd);
    } else {
        randomValue();
    }
}

function getFaceValue(value) {
    let rtn = value;
    if (value < availableCards.length) {
        rtn = availableCards[value];
    }
    return rtn;
}

function restartGame() {
    resetGame();
    document.getElementById('instruction').style.display = 'block'; // Muestra el enunciado al reiniciar
    document.getElementById('startGame').style.display = 'block'; // Muestra el botón de inicio al reiniciar
    document.getElementById('restartGame').style.display = 'none'; // Oculta el botón de reiniciar juego al reiniciar
}

function checkVictory() {
   let matched = 0;
   document.querySelectorAll('.card').forEach(card => {
       if (card.classList.contains('active')) {
           matched++;
       }
   });

   if (matched === totalCards) {
       // Todas las cartas están emparejadas, mostrar mensaje de victoria
       alert('¡Felicidades! ¡Has encontrado todas las parejas!');
   }
}

function activate(e) {
   if (currentMove < 2) {
       if ((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active')) {
           e.target.classList.add('active');
           selectedCards.push(e.target);

           if (++currentMove == 2) {
               currentAttempts++;
               document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';

               if (selectedCards[0].querySelectorAll('.face')[0].innerHTML == selectedCards[1].querySelectorAll('.face')[0].innerHTML) {
                   selectedCards = [];
                   currentMove = 0;
                   checkVictory(); // Verificar si todas las cartas están emparejadas
               } else {
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



