addEventListener('DOMContentLoaded', function() {

    console.log("insertar");
    const formularioProducto = document.getElementById('formularioProducto');

    formularioProducto.addEventListener('submit', function(event) {
        event.preventDefault();

        const datosFormulario = new FormData(formularioProducto);

        fetch('php/insert.php', {
            method: 'POST',
            body: datosFormulario
        })
        .then(response => response.text())
        .then(data => {
            alert(data); // Muestra el mensaje del servidor
            window.location.href = 'index.html'; // Redirige a index.html
        })
        .catch(error => console.error('Error:', error));
    });
});