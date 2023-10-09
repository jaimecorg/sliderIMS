addEventListener('DOMContentLoaded', function() {

    datosProductos = [];

    //asignarProducto();
    fetch('php/list.php') // Hace una petición GET al archivo list.php
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
                    clearInterval(interval);
                }
            }, 2000);

            /*
                data.forEach(product => {

                    datosProductos = [];

                    for (let property in product) {
                        datosProductos.push(product[property]);
                    }

                    //Función que ejecute asignarProducto cada x tiempo

                    let contador;

                    contador = setTimeout(() => asignarProducto(datosProductos), 2000);

                    //console.log(datosProductos);
                    //asignarProducto(datosProductos);
                });
            */
        })
        .catch(error => console.error('Error:', error)); // Captura y maneja errores
});

function asignarProducto(datosProductos){
    let imagen = document.querySelector(".imagenProducto img")
    let titulo = document.getElementById("titulo");
    let descripcion = document.getElementById("descripcion");
    let precio = document.getElementById("precio");

    console.log(datosProductos['visual'])
    imagen.src = datosProductos['visual']
    titulo.textContent = datosProductos['nombre'];
    descripcion.textContent = datosProductos['descripcion'];
    precio.textContent = datosProductos['precio'];

    //console.log(titulo, descripcion, precio);
}
