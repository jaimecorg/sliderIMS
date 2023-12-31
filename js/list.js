addEventListener('DOMContentLoaded', function() {
    let tablaContendor = document.getElementById('tablaProductos');
    let tabla = tablaContendor.getElementsByTagName("table")[0];

    fetch('php/list.php') // Hace una petición GET al archivo list.php
        .then(response => response.json()) // Parsea la respuesta como JSON
        .then(data => { // Manipula los datos JSON
            let propiedades = [];

            if(data[0] != undefined){
                for (let property in data[0]) {
                    propiedades.push(property);
                }

                //Apartados de eliminar y editar de la tabla
                propiedades.push("");
                propiedades.push("");
                
                crearTabla(tabla, propiedades);
            }

            data.forEach(product => {
                let datosProductos = [];

                for (let property in product) {
                    datosProductos.push(product[property]);
                }

                datosProductos.push("");
                datosProductos.push("");

                agregarFilaATabla(tabla, datosProductos);
            });
        })
        .catch(error => console.error('Error:', error)); // Captura y maneja errores
});

function crearTabla(tabla, productos = []){
    // Crear una fila de encabezado
    let filaEncabezado = tabla.insertRow(0);

    // Agregar celdas con los títulos
    productos.forEach((producto, index) => {
        let celda = filaEncabezado.insertCell(index);
        celda.textContent = mayusculaPrimeraLetra(producto);
    });  
}

function agregarFilaATabla(tabla, datos = []) {
    // Crear una nueva fila
    let nuevaFila = tabla.insertRow();

    // Agregar celdas con los datos
    datos.forEach((dato) => {
        let celda = nuevaFila.insertCell();
        celda.textContent = dato;
    });

    // Agregar celda con botón
    // Agregar botón en el quinto/sexto elemento 
    let elementoEliminar = nuevaFila.querySelector("td:nth-child(9)");
    let elementoEditar = nuevaFila.querySelector("td:nth-child(10)");

    let botonEliminar = document.createElement('button');
    botonEliminar.classList.add("eliminarProducto");
    botonEliminar.textContent = "Eliminar";
    elementoEliminar.appendChild(botonEliminar);

    let celdaId = nuevaFila.querySelector("td:nth-child(1)");

    botonEliminar.addEventListener("click", function(){
        eliminarProducto(celdaId.textContent);
    });

    // Crear enlace
    let enlaceEditar = document.createElement('a');
    enlaceEditar.href = `edit.html?id=${celdaId.textContent}`; // Reemplaza idProducto con el ID real
    enlaceEditar.textContent = "Editar";
    elementoEditar.appendChild(enlaceEditar);
}

function eliminarProducto(productoId){
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        fetch(`php/delete.php?id=${productoId}`, {
            method: 'GET',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            window.location.href = 'list.html'; // Redirige a index.html
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

function mayusculaPrimeraLetra(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

