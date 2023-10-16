addEventListener('DOMContentLoaded', function() {

    getHora();
    datosProductos = [];

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

            /* mostrarProducto();
            function mostrarProducto(){
            
                if (contador < data.length) {
                    let product = data[contador];

                    if (comprobarHorario(product)) {
                        setTimeout(() => {
                            asignarProducto(product);
                          }, 1000);
                    }

                    contador++;
                } else {
                    contador = 0;
                    //clearInterval(interval);
                }
            } */

            const interval = setInterval(() => {
                if (contador < data.length) {
                    let product = data[contador];

                    if (comprobarHorario(product)) {
                        asignarProducto(product);
                    }

                    contador++;
                } else {
                    contador = 0;
                    //clearInterval(interval);
                }
            }, 2000);
        })
        .catch(error => console.error('Error:', error) // Captura y maneja errores
    );
});

//Comprueba si la hora actual está comprendida entre la hora inicial y final del 
//producto para así mostrarse o no
function comprobarHorario(producto){
    let hora = getHora();
    //Le ponemos formato Date para facilitar la comparación entre las fechas
    let horaInicio = new Date(`2000-01-01T${producto['fechaInicio']}`);
    let horaFinal = new Date(`2000-01-01T${producto['fechaFinal']}`);
    let horaActual = new Date(`2000-01-01T${hora}`);
    let position = false

    if (horaActual > horaInicio && horaActual < horaFinal) {
        position = true;
        console.log("correcto");

    } else {
        if (horaActual < horaInicio || horaActual > horaFinal) {
            position = false;
            console.log("error");
        }
    }

    return position;
}

//Asigna los datos del producto a la plantilla
function asignarProducto(datosProductos){
    let imagen = document.querySelector(".imagenProducto img")
    let titulo = document.getElementById("titulo");
    let descripcion = document.getElementById("descripcion");
    let precio = document.getElementById("precio");

    imagen.src = datosProductos['visual']
    titulo.textContent = datosProductos['nombre'];
    descripcion.textContent = datosProductos['descripcion'];
    precio.textContent = datosProductos['precio'];
}

//Función que muestra la hora
function getHora(){
    let fecha = new Date();
    let horas = fecha.getHours();
    let minutos = fecha.getMinutes();

    //Si la hora es menos a 10 segundos se le añade un 0 delante
    if (horas < 10) {
        horas = '0' + horas;
    }

    if (minutos < 10) {
        minutos = '0' + minutos;
    }

    let hora = horas + ":" + minutos + ":" + "00"

    return hora; 
}