addEventListener('DOMContentLoaded', function() {
    let formularioProducto = document.getElementById('formularioProducto');

    formularioProducto.addEventListener('submit', function(event) {
        event.preventDefault();

        let datosFormulario = new FormData(formularioProducto);

        fetch('php/insert.php', {
            method: 'POST',
            body: datosFormulario
        })
        .then(response => response.text())
        .then(data => {
            alert(data); // Muestra el mensaje del servidor
            window.location.href = 'list.html'; // Redirige a index.html
        })
        .catch(error => console.error('Error:', error));
    });
});