document.addEventListener('DOMContentLoaded', function() {
    let tablaContendor = document.getElementById('tablaProductos');
    let tabla = tablaContendor.getElementsByTagName("table")[0];

    fetch('php/list.php') // Hace una petición GET al archivo list.php
        .then(response => response.json()) // Parsea la respuesta como JSON
        .then(data => { // Manipula los datos JSON
            let propiedades = [];

            if(data[0] != undefined){
                for (const property in data[0]) {
                    propiedades.push(property);
                }
                
                crearTabla(tabla, propiedades);
            }

            data.forEach(product => {
                let datosProductos = [];

                for (const property in product) {
                    datosProductos.push(product[property]);
                }

                agregarFilaATabla(tabla, datosProductos);
            });
        })
        .catch(error => console.error('Error:', error)); // Captura y maneja errores
});

function crearTabla(tabla, productos = []){
    tabla.setAttribute("border", 2);
    // Crear una fila de encabezado
    const filaEncabezado = tabla.insertRow(0);

    // Agregar celdas con los títulos
    productos.forEach((producto, index) => {
        const celda = filaEncabezado.insertCell(index);
        celda.textContent = mayusculaPrimeraLetra(producto);
        
    });  
}

function agregarFilaATabla(tabla, datos = []) {
    // Crear una nueva fila
    const nuevaFila = tabla.insertRow();

    // Agregar celdas con los datos
    datos.forEach((dato) => {
        const celda = nuevaFila.insertCell();
        celda.textContent = dato;
    });
}

function mayusculaPrimeraLetra(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}



