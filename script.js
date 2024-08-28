let startTime;
let endTime;
let reactionTimes = [];

const startButton = document.getElementById("startButton");
const reactionButton = document.getElementById("reactionButton");
const instruction = document.getElementById("instruction");
const result = document.getElementById("result");
const averageTime = document.getElementById("averageTime");

document.getElementById('startButton').addEventListener('click', function() {
    // Oculta el botón de inicio y muestra las instrucciones
    document.getElementById('startButton').classList.add('hidden');
    document.getElementById('reactionTest').classList.remove('hidden');
    document.getElementById('instruction').textContent = 'Espera el estímulo...';

    // Inicia el temporizador para mostrar el botón de reacción después de un tiempo aleatorio
    setTimeout(function() {
        document.getElementById('instruction').textContent = '¡Reacciona!';
        document.getElementById('reactionButton').classList.remove('hidden');
        
        // Comienza a medir el tiempo
        window.reactionStartTime = new Date().getTime();
    }, Math.random() * 3000 + 2000); // Espera entre 2 y 5 segundos aleatoriamente
});

document.getElementById('reactionButton').addEventListener('click', function() {
    // Calcula el tiempo de reacción
    var reactionEndTime = new Date().getTime();
    var reactionTime = reactionEndTime - window.reactionStartTime;
    
    // Muestra el resultado
    document.getElementById('result').textContent = 'Tu tiempo de reacción fue: ' + reactionTime + 'ms';

    // Esconde el botón de reacción nuevamente
    document.getElementById('reactionButton').classList.add('hidden');
    document.getElementById('instruction').textContent = 'Prueba completada.';
});

