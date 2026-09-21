const seleccion = document.getElementById('opcion');
const radioGroup = document.querySelector('.radio-group');

seleccion.addEventListener('change', function () {
    const selectedOption = seleccion.options[seleccion.selectedIndex];
    if (selectedOption) {
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = 'opcion';
        radioInput.value = selectedOption.value;
        radioInput.id = selectedOption.value;

        const radioLabel = document.createElement('label');
        radioLabel.htmlFor = selectedOption.value;
        radioLabel.textContent = selectedOption.text;

        radioGroup.appendChild(radioInput);
        radioGroup.appendChild(radioLabel);

        seleccion.remove(seleccion.selectedIndex);
    }
});
