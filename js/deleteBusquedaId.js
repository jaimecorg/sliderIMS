// Borrado introduciendo el id

addEventListener('DOMContentLoaded', function() {
    let formularioBaja = document.getElementById('formularioBaja');

    console.log("borrar");

    formularioBaja.addEventListener('submit', function(event) {
        event.preventDefault();

        // Pedir confirmación
        let confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto?");

        if (confirmacion) {
            let datosFormulario = new FormData(formularioBaja);

            fetch('php/delete.php', {
                method: 'POST',
                body: datosFormulario
            })
            .then(response => response.text())
            .then(data => {
                alert(data); // Muestra el mensaje del servidor
            })
            .catch(error => console.error('Error:', error));
        }
    });
});
