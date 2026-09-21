document.addEventListener('DOMContentLoaded', function () {
  const cotizarButton = document.getElementById('cotizar');
  const nuevoButton = document.getElementById('nuevo');
  const selectedProductsList = document.getElementById('selected-products');
  const total = document.getElementById('total-price');
  const radioOptions = document.querySelectorAll('input[name="radioOption"]');
  const checkBoxOptions = document.querySelectorAll('input[type="checkbox"]');
  const deliveryOptions = document.querySelectorAll('input[name="radioOption4"]');
  const deliveryResult = document.getElementById('delivery-result'); // Nuevo elemento para mostrar la opción de entrega

  // Manejador de evento para el botón "Cotizar"
  cotizarButton.addEventListener('click', function () {
      const selectedProduct = Array.from(radioOptions).some(radio => radio.checked);

      if (!selectedProduct) {
          alert('Debes seleccionar un tipo de pollo antes de continuar.');
          return;
      }

      let deliverySelected = false;
      let selectedDeliveryOption = ''; // Variable para almacenar la opción de entrega seleccionada

      deliveryOptions.forEach(function (deliveryOption) {
          if (deliveryOption.checked) {
              deliverySelected = true;
              selectedDeliveryOption = deliveryOption.nextElementSibling.textContent;
          }
      });

      if (!deliverySelected) {
          alert('Por favor, elige la opción de entrega antes de continuar.');
          return;
      }

      const selectedProducts = document.querySelectorAll('input[name="radioOption"]:checked');
      const selectedExtras = document.querySelectorAll('input[type="checkbox"]:checked');
      let totalPrice = 0;

      selectedProductsList.innerHTML = '';

      selectedProductsList.innerHTML += `<li>Tipo de Pollo:</li>`;
      selectedProducts.forEach(function (product) {
          const productName = product.nextElementSibling.textContent;
          const productPrice = parseFloat(product.nextElementSibling.nextElementSibling.textContent.replace('$', ''));
          selectedProductsList.innerHTML += `<li>${productName} - Precio: $${productPrice.toFixed(2)}</li>`;
          totalPrice += productPrice;
      });

      if (selectedExtras.length > 0) {
          selectedProductsList.innerHTML += `<li>Extras:</li>`;
          selectedExtras.forEach(function (extra) {
              const extraName = extra.nextElementSibling.textContent;
              const extraPrice = parseFloat(extra.nextElementSibling.nextElementSibling.textContent.replace('$', ''));
              selectedProductsList.innerHTML += `<li>${extraName} - Precio: $${extraPrice.toFixed(2)}</li>`;
              totalPrice += extraPrice;
          });
      }

      // Mostrar la opción de entrega en los resultados
      deliveryResult.innerHTML = `<li>Entrega: ${selectedDeliveryOption}</li>`;

      total.textContent = totalPrice.toFixed(2);
      cotizarButton.disabled = true;

      // Añadir una clase al contenedor de resultados
      selectedProductsList.classList.add('result-font');
  });

  // Manejador de evento para el botón "Nuevo"
  nuevoButton.addEventListener('click', function () {
      const selectedInputs = document.querySelectorAll('input[type="radio"], input[type="checkbox"]');
      selectedInputs.forEach(function (input) {
          input.checked = false;
      });

      selectedProductsList.innerHTML = '';
      deliveryResult.innerHTML = ''; // Limpiar la opción de entrega al hacer clic en "Nuevo"
      total.textContent = '0.00';
      cotizarButton.disabled = false;

      // Remover la clase del contenedor de resultados al hacer clic en "Nuevo"
      selectedProductsList.classList.remove('result-font');
  });
});
