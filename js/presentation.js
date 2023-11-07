let interval;
let contador = 0;

addEventListener('DOMContentLoaded', function() {

    getHora();
    datosProductos = [];
    mostrar();
});

function mostrar(){

    fetch('php/list.php') // Hace una petición GET al archivo list.php
    .then(response => response.json()) // Parsea la respuesta como JSON
    .then(data => { // Manipula los datos JSON
        
        data.forEach(product => {

            datosProductos = [];

            for (let property in product) {
                datosProductos.push(product[property]);
            }
        });

        interval = setInterval(() => {
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
}

//Asigna los datos del producto a la plantilla
function asignarProducto(datosProductos){
    let imagen = document.querySelector(".imagenProducto img");
    let video = document.querySelector(".imagenProducto video");
    let titulo = document.getElementById("titulo");
    let descripcion = document.getElementById("descripcion");
    let precio = document.getElementById("precio");

    borrarMultimedia(imagen, video);
    
    if(datosProductos['duracion'] != 0){
        video.classList.remove("ocultar"); //Oculta o muestra el elemento video
        video.src = "img/" + datosProductos['visual'];
        clearInterval(interval);
        setTimeout(function(){
            mostrar();

        }, datosProductos['duracion'] * 1000);

    }else{
        video.classList.add("ocultar");
        imagen.src = "img/" + datosProductos['visual']; //Ojo recién cambiado
    }

    titulo.textContent = datosProductos['nombre'];
    descripcion.textContent = datosProductos['descripcion'];
    precio.textContent = datosProductos['precio'];
}

function borrarMultimedia(imagen, video){
    imagen.src = "";
    video.src = "";
}

//Función que muestra la hora
function getHora(){
    let fecha = new Date();
    let horas = fecha.getHours();
    let minutos = fecha.getMinutes();
    //let segundos = fecha.getSeconds();

    let hora = horas + ":" + minutos + ":" + "00";
    //console.log(hora)

    return hora; 
}
