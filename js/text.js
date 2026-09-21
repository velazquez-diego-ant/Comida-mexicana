var resultadosMostrados = false; // Variable para rastrear si los resultados ya se mostraron

// Lista de respuestas correctas
var respuestasCorrectasLista = [
  "Bélgica",
  "Buenos Aires",
  "Puerto Rico",
  "Caracas",
  "Brasil",  // Cambiado de "Brazil" a "Brasil"
  "Lima",
  "Trinidad y Tobago",
  "La Habana",
  "Nicaragua",
  "Quito"
];





function mostrarResultados() {
  if (resultadosMostrados) {
    return; // Evita que los resultados se muestren nuevamente
  }

  var selectElements = document.getElementsByClassName("question");
  var respuestasCorrectas = 0;
  var respuestasIncorrectas = []; // Almacena las respuestas incorrectas
  var totalPreguntas = selectElements.length;

  for (var i = 0; i < selectElements.length; i++) {
    var pregunta = selectElements[i];
    var valor = pregunta.options[pregunta.selectedIndex].value;
    var icono = document.getElementById("icon" + (i + 1));
    var feedback = document.getElementById("feedback" + (i + 1));

    if (valor === "correct") {
      icono.innerHTML = '<img class="icono-img success-icon" src="img/marca-de-verificacion.png" alt="Correcto">';
      respuestasCorrectas++;
    } else if (valor === "incorrect") {
      icono.innerHTML = '<img class="icono-img error-icon" src="img/boton-eliminar.png" alt="Incorrecto">';
      respuestasIncorrectas.push(i + 1); // Almacena el número de la pregunta incorrecta

      // Muestra la respuesta correcta con un color verde claro
      feedback.innerHTML = `<span style="color: #28a745;">Respuesta correcta: ${respuestasCorrectasLista[i]}</span>`;
    }

    // Deshabilita el elemento select para evitar cambios
    pregunta.disabled = true;
  }

  // Muestra la puntuación y la cantidad de respuestas correctas
  var puntuacion = document.getElementById("puntuacion");
  puntuacion.innerText = `Tienes ${respuestasCorrectas} respuestas correctas de ${totalPreguntas}.`;

  // Muestra las respuestas incorrectas si las hay
  var respuestasIncorrectasDiv = document.getElementById("respuestasIncorrectas");
  if (respuestasIncorrectas.length > 0) {
    respuestasIncorrectasDiv.innerHTML = `<p>Preguntas incorrectas:</p><ul>`;
    respuestasIncorrectas.forEach(function (index) {
      respuestasIncorrectasDiv.innerHTML += `<li>${index}. ${respuestasCorrectasLista[index - 1]}</li>`;
    });
    respuestasIncorrectasDiv.innerHTML += `</ul>`;
  } else {
    respuestasIncorrectasDiv.innerHTML = '<p>Todas las respuestas estan sin contestar. Intentalo de Nuevo</p>';
  }

  // Deshabilita el botón "Mostrar Resultados" y marca los resultados como mostrados
  document.getElementById("mostrarResultados").disabled = true;
  resultadosMostrados = true;
}

function reiniciarValores() {
  resultadosMostrados = false; // Habilita nuevamente la posibilidad de mostrar resultados
  var selectElements = document.getElementsByClassName("question");

  for (var i = 0; i < selectElements.length; i++) {
    selectElements[i].value = "";
    document.getElementById("icon" + (i + 1)).innerHTML = ""; // Limpiar los iconos
    document.getElementById("feedback" + (i + 1)).innerHTML = "";
    selectElements[i].disabled = false; // Habilita nuevamente los elementos select
  }

  var puntuacion = document.getElementById("puntuacion");
  puntuacion.innerText = "";

  // Limpiar las respuestas incorrectas
  var respuestasIncorrectasDiv = document.getElementById("respuestasIncorrectas");
  respuestasIncorrectasDiv.innerHTML = "";

  document.getElementById("mostrarResultados").disabled = false; // Habilita el botón "Mostrar Resultados" nuevamente
}
