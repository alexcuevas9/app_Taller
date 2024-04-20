let displayValue = '';
let history = [];/*array vacio*/

function appendValor(value) {
    displayValue += value;
    subirResultado();
}

function appendOperador(operador) {
    if (displayValue !== '') {
        if (isNaN(displayValue[displayValue.length - 1])) {
            displayValue = displayValue.slice(0, -1) + operador;
        } else {
            displayValue += operador;
        }
        subirResultado();
    }
}

function limpiar() {
    displayValue = '';
    subirResultado();
}

function subirResultado() {
    document.getElementById('display').value = displayValue;
}

function resultado() {
    try {
        let result = eval(displayValue);
        history.push(displayValue + ' = ' + result);
        displayValue = result;
        subirResultado();
        updateHistorial();
    } catch (error) {
        displayValue = 'Error';
        subirResultado();
    }
}

function updateHistorial() {
    let historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.forEach((calculation) => {
        let listItem = document.createElement('li');
        listItem.textContent = calculation;
        historyList.appendChild(listItem);
    });
}


