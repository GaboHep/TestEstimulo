let attempts = 0;
let maxAttempts = 3;
let reactionTimes = [];

// Lista de botones y sus posiciones
const buttons = ['blueButton', 'redButton', 'greenButton', 'yellowButton'];

document.getElementById('startButton').addEventListener('click', function() {
    maxAttempts = parseInt(document.getElementById('attemptsSelect').value);
    attempts = 0;
    reactionTimes = [];

    // Ocultar el botón de inicio, el selector de intentos y la etiqueta
    document.getElementById('startButton').classList.add('hidden');
    document.getElementById('attemptsSelect').classList.add('hidden');
    document.getElementById('attemptsLabel').classList.add('hidden');
    
    document.getElementById('reactionTest').classList.remove('hidden');
    document.getElementById('result').textContent = '';
    document.getElementById('averageTime').textContent = '';

    startReactionTest();
});

// Resto del código...


function startReactionTest() {
    document.getElementById('instruction').textContent = 'Haz clic en el botón Azul';
    
    shuffleButtons(); // Reorganiza los botones aleatoriamente

    // Iniciar el temporizador para comenzar la medición de tiempo
    setTimeout(function() {
        window.reactionStartTime = new Date().getTime();
    }, 500); // Breve retardo antes de que el usuario pueda hacer clic
}

// Función para reorganizar los botones aleatoriamente
function shuffleButtons() {
    const container = document.getElementById('colorButtons');
    
    // Reordenar los elementos de forma aleatoria
    buttons.sort(() => Math.random() - 0.5);

    // Aplicar el nuevo orden al contenedor
    buttons.forEach(buttonId => {
        container.appendChild(document.getElementById(buttonId));
    });
}

// Event listener para cada botón
buttons.forEach(buttonId => {
    document.getElementById(buttonId).addEventListener('click', function() {
        handleReaction(buttonId === 'blueButton');
    });
});

function handleReaction(isCorrect) {
    if (isCorrect) {
        // Calcula el tiempo de reacción si el botón azul fue seleccionado
        var reactionEndTime = new Date().getTime();
        var reactionTime = reactionEndTime - window.reactionStartTime;
        reactionTimes.push(reactionTime);

        attempts++;

        document.getElementById('result').textContent = `Intento ${attempts}: ${reactionTime} ms`;

        if (attempts < maxAttempts) {
            startReactionTest();
        } else {
            // Calcular y mostrar el tiempo promedio
            const total = reactionTimes.reduce((acc, time) => acc + time, 0);
            const average = total / reactionTimes.length;
            document.getElementById('averageTime').textContent = `Tiempo promedio: ${average.toFixed(2)} ms`;

            // Mostrar nuevamente el selector de intentos
            document.getElementById('startButton').classList.remove('hidden');
            document.getElementById('attemptsSelect').classList.remove('hidden');
        }
    } else {
        // Si el botón seleccionado no es el azul
        document.getElementById('instruction').textContent = 'Color incorrecto. Selecciona Azul.';
    }
}

