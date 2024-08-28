let attempts = 0;
let maxAttempts = 3;
let reactionTimes = [];
let currentColor = '';

const colors = ['blue', 'red', 'green', 'yellow'];
const colorToButtonId = {
    blue: 'blueButton',
    red: 'redButton',
    green: 'greenButton',
    yellow: 'yellowButton'
};

document.getElementById('startButton').addEventListener('click', function() {
    maxAttempts = parseInt(document.getElementById('attemptsSelect').value);
    attempts = 0;
    reactionTimes = [];

    document.getElementById('startButton').classList.add('hidden');
    document.getElementById('reactionTest').classList.remove('hidden');
    document.getElementById('result').textContent = '';
    document.getElementById('averageTime').textContent = '';

    startReactionTest();
});

function startReactionTest() {
    document.getElementById('instruction').textContent = 'Espera el estímulo...';
    document.getElementById('colorButtons').classList.add('hidden');

    // Elegir un color al azar
    currentColor = colors[Math.floor(Math.random() * colors.length)];
    console.log(`El color a seleccionar es: ${currentColor}`);

    // Iniciar el temporizador para mostrar los botones después de un tiempo aleatorio
    setTimeout(function() {
        document.getElementById('instruction').textContent = `Haz clic en el botón de color ${currentColor}`;
        document.getElementById('colorButtons').classList.remove('hidden');
        
        // Comienza a medir el tiempo
        window.reactionStartTime = new Date().getTime();
    }, Math.random() * 3000 + 2000); // Espera entre 2 y 5 segundos aleatoriamente
}

// Añadir event listeners para cada botón de color
colors.forEach(color => {
    document.getElementById(colorToButtonId[color]).addEventListener('click', function() {
        handleReaction(color);
    });
});

function handleReaction(selectedColor) {
    // Calcula el tiempo de reacción solo si el color es correcto
    if (selectedColor === currentColor) {
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

            document.getElementById('startButton').classList.remove('hidden');
        }

        document.getElementById('colorButtons').classList.add('hidden');
    } else {
        // Opción incorrecta, tal vez mostrar un mensaje o reiniciar la prueba
        document.getElementById('instruction').textContent = 'Color incorrecto. Inténtalo de nuevo.';
    }
}
