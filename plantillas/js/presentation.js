addEventListener('DOMContentLoaded', function() {

    getHora();
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
                    //clearInterval(interval);
                }
            }, 2000);
        })
        .catch(error => console.error('Error:', error)); // Captura y maneja errores
});

//Asigna los datos del producto a la plantilla
function asignarProducto(datosProductos){
    let imagen = document.querySelector(".imagenProducto img")
    let titulo = document.getElementById("titulo");
    let descripcion = document.getElementById("descripcion");
    let precio = document.getElementById("precio");

    //imagen.src = datosProductos['visual']
    //document.body.style.backgroundImage = 'url(' + datosProductos['visual'] + ')';
    document.body.style.backgroundImage = 'url("../../' + datosProductos['visual'] + '")';

    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';

    titulo.textContent = datosProductos['nombre'];
    descripcion.textContent = datosProductos['descripcion'];
    precio.textContent = datosProductos['precio'];
}

//Función que muestra la hora
function getHora(){
    let fecha = new Date();
    let horas = fecha.getHours();
    let minutos = fecha.getMinutes();
    //let segundos = fecha.getSeconds();

    let hora = horas + ":" + minutos + ":" + "00"
    //console.log(hora)

    return hora; 
}
