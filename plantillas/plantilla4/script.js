let interval;
let contador = 0;

addEventListener('DOMContentLoaded', function() {

    getHora();
    datosProductos = [];

    mostrar();
});

function mostrar(){

    fetch('../php/list.php') // Hace una petición GET al archivo list.php
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
    let titulo = document.getElementById("titulo");
    let descripcion = document.getElementById("descripcion");
    let precio = document.getElementById("precio");
    let claseImagen = document.getElementById("contenedorImagen");

    if(datosProductos['duracion'] != 0){
        claseImagen.style.backgroundImage = "";
        crearVideo(datosProductos['visual']);
        clearInterval(interval);
        setTimeout(function(){
            mostrar();

        }, datosProductos['duracion'] * 1000);
    }else{
        eliminarVideo();
        claseImagen.style.backgroundImage = 'url("../../img/' + datosProductos['visual'] + '")';

        claseImagen.style.backgroundSize = 'cover';
        claseImagen.style.backgroundRepeat = 'no-repeat';
    }
    
    titulo.textContent = datosProductos['nombre'];
    descripcion.textContent = datosProductos['descripcion'];
    precio.textContent = datosProductos['precio'];
}

function crearVideo(video) {
    let contenedor = document.getElementById("contenedorImagen");
    const videoElement = document.createElement('video'); // Crea el elemento video
    
    videoElement.id = 'backgroundVideo'; // Asigna un ID
    videoElement.autoplay = true; // Reproducción automática
    videoElement.muted = true; // Video en silencio
    videoElement.loop = true; // Reproducción en bucle

    const sourceElement = document.createElement('source'); // Crea un elemento source
    sourceElement.src = "../../img/" + video; // Establece la fuente del video
    sourceElement.type = 'video/mp4'; // Tipo de archivo

    videoElement.appendChild(sourceElement); // Agrega el elemento source al video
    contenedor.appendChild(videoElement); // Agrega el video al cuerpo del documento
}

function eliminarVideo() {
    const videoElement = document.getElementById('backgroundVideo');

    if (videoElement) {
        videoElement.pause(); // Pausa el video si está reproduciéndose
        videoElement.remove(); // Elimina el elemento video del DOM
    }
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
