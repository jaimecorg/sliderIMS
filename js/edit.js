addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const idProducto = urlParams.get('id');

    let formularioProducto = document.getElementById('formularioEdicion');
    
    cargarDatosEnFormulario(idProducto);
    
    formularioProducto.addEventListener('submit', function(event) {
        event.preventDefault();
    
        let datosFormulario = new FormData(formularioProducto);
    
        console.log(datosFormulario)

        fetch('php/edit.php', {
            method: 'POST',
            body: datosFormulario
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            window.location.href = 'list.html'; // Redirige a list.html
        })
        .catch(error => console.error('Error:', error));
    });
});

function cargarDatosEnFormulario(idProducto) {
    // Hacer una petición al servidor para obtener los datos del producto
    fetch(`php/mostrarDatos.php?id=${idProducto}`, {
        method: 'GET',
    })
    .then(response => response.json()) 
    .then(data => {
        // Verificar si se obtuvo una respuesta exitosa
        if (data.success) {
            // Rellenar los campos del formulario de edición con los datos del producto
            document.getElementById('idEdicion').value = data.producto.id;
            document.getElementById('nombreEdicion').value = data.producto.nombre;
            document.getElementById('precioEdicion').value = data.producto.precio;
            document.getElementById('visualEdicion').value = data.producto.visual;
            document.getElementById('horaInicioEdicion').value = data.producto.fechaInicio;
            document.getElementById('horaFinalEdicion').value = data.producto.fechaFinal;
            document.getElementById('descripcionEdicion').value = data.producto.descripcion;
            formularioProducto = document.getElementById('formularioEdicion'); // Asigna el formulario a la variable
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
