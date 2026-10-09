// Obtén los elementos del DOM
const enviarButton = document.getElementById('enviar'); // Obtén el botón de "Enviar resultados"
const resultElement = document.getElementById('result'); // Obtén el elemento donde se mostrarán los resultados
const resetButton = document.getElementById('reset'); // Obtén el botón de "Reiniciar"

// Agrega un evento "click" al botón "Enviar resultados"
enviarButton.addEventListener('click', function () {
    const unansweredQuestions = findUnansweredQuestions(); // Llama a la función para encontrar preguntas sin responder

    if (unansweredQuestions.length === 0) {
        // Todas las preguntas están contestadas
        const results = calculateResults(); // Calcula los resultados del cuestionario

        // Recorre los grupos de preguntas (10 en total)
        for (let i = 1; i <= 10; i++) {
            const radios = document.getElementsByName(`grupo${i}`); // Obtiene las opciones de respuesta de un grupo
            radios.forEach(radio => {
                const icon = radio.checked ? (radio.value === '1' ? '✅' : '❌') : ''; // Marca con un icono si la respuesta es correcta o incorrecta
                const label = radio.nextElementSibling; // Obtiene el elemento HTML siguiente al radio, que contiene el texto de la pregunta
                label.innerHTML = `${label.textContent} ${icon}`; // Agrega el icono al texto de la pregunta
            });
        }

        const resultsText = `Sacaste ${results.correct} buenas y ${results.incorrect} malas`; // Crea un mensaje con los resultados
        resultElement.textContent = resultsText; // Muestra el mensaje de resultados en la página
    } else {
        // Algunas preguntas están sin responder
        alert(`Te faltan responder las preguntas: ${unansweredQuestions.join(', ')}`); // Muestra una alerta con las preguntas sin responder
    }
});

// Función para encontrar preguntas sin responder
function findUnansweredQuestions() {
    const unanswered = [];

    for (let i = 1; i <= 10; i++) {
        const radios = document.getElementsByName(`grupo${i}`); // Obtiene las opciones de respuesta de un grupo
        let selected = false;

        radios.forEach(radio => {
            if (radio.checked) {
                selected = true; // Marca como seleccionada si hay al menos una respuesta seleccionada en el grupo
            }
        });

        if (!selected) {
            unanswered.push(i); // Agrega el número de grupo a la lista de preguntas sin responder
        }
    }

    return unanswered; // Devuelve la lista de preguntas sin responder
}

// Agrega un evento "click" al botón "Reiniciar"
resetButton.addEventListener('click', function () {
    resetQuiz(); // Llama a la función para reiniciar el cuestionario
});

// Función para calcular los resultados
function calculateResults() {
    const results = {
        correct: 0, // Inicializa el contador de respuestas correctas
        incorrect: 0, // Inicializa el contador de respuestas incorrectas
    };

    for (let i = 1; i <= 10; i++) {
        const radios = document.getElementsByName(`grupo${i}`); // Obtiene las opciones de respuesta de un grupo
        let selected = false;

        radios.forEach(radio => {
            if (radio.checked) {
                selected = radio.value === '1'; // Marca como correcta si la respuesta seleccionada es '1'
            }
        });

        results[`grupo${i}`] = selected; // Almacena si el grupo i es correcto o incorrecto en los resultados
        if (selected) {
            results.correct++; // Incrementa el contador de respuestas correctas
        } else {
            results.incorrect++; // Incrementa el contador de respuestas incorrectas
        }
    }

    return results; // Devuelve los resultados
}
// Función para reiniciar el cuestionario
function resetQuiz() {
    for (let i = 1; i <= 10; i++) {
        const radios = document.getElementsByName(`grupo${i}`); // Obtiene las opciones de respuesta de un grupo
        radios.forEach(radio => {
            radio.checked = false; // Desmarca todas las opciones de respuesta en cada grupo
        });

        const labels = document.querySelectorAll(`[for^="valor${i}"]`); // Encuentra las etiquetas relacionadas con el grupo
        labels.forEach(label => {
            label.textContent = label.textContent.replace(/\s✅|\s❌/, ''); // Elimina los iconos  del texto de la etiqueta
        });
    }
    resultElement.textContent = ''; // Borra el contenido de resultados en la página
}