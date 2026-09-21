function ShowSelected()
      {
          /* Obtención de valor */
          var valor = document.getElementById("carreraseleccion").value;
          /* Obtención de texto */
          var combo = document.getElementById("carreraseleccion");
          var textocombo = combo.options[combo.selectedIndex].text;
          textosalidauno.innerText= "El valor del componente seleccionado es" + " " + valor;
          textosalidados.innerText = "El texto del componente seleccionado es" + " " + textocombo;
      }