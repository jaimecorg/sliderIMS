addEventListener('DOMContentLoaded', function() {

    datosProductos = [];

    fetch('../php/list.php') // Hace una petición GET al archivo list.php
        .then(response => response.json()) // Parsea la respuesta como JSON
        .then(data => { // Manipula los datos JSON
            
            data.forEach(product => {

                datosProductos = [];

                for (let property in product) {
                    datosProductos.push(product[property]);
                }
            });

            let contador = 0;

            const interval = setInterval(() => {
                if (contador < data.length) {
                    let product = data[contador];
                    asignarProducto(product);
                    contador++;
                } else {
                    contador = 0;
                }
            }, 2000);
        })
        .catch(error => console.error('Error:', error)); // Captura y maneja errores
});

//Asigna los datos del producto a la plantilla
function asignarProducto(datosProductos){
    let imagen = document.querySelector("body");

    console.log(imagen);

    imagen.style.backgroundImage = 'url("../../' + datosProductos['visual'] + '")';
    imagen.style.backgroundSize = 'cover';
    imagen.style.backgroundRepeat = 'no-repeat'; 
}

