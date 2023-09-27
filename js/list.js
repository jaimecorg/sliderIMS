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
                propiedades.push("")
                
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
    let quintoElemento = nuevaFila.querySelector("td:nth-child(5)");
    let sextoElemento = nuevaFila.querySelector("td:nth-child(6)");

    let botonEliminar = document.createElement('button');
    botonEliminar.classList.add("eliminarProducto");
    botonEliminar.textContent = "Eliminar";
    quintoElemento.appendChild(botonEliminar);

    let celdaId = nuevaFila.querySelector("td:nth-child(1)");
    console.log(celdaId.textContent);

    botonEliminar.addEventListener("click", function(){
        console.log("borrar")

        eliminarProducto(celdaId.textContent);
        
    });

    let botonEditar = document.createElement('button');
    botonEditar.classList.add("editarProducto");
    botonEditar.textContent = "Editar";
    sextoElemento.appendChild(botonEditar);   
}

function eliminarProducto(productoId){
    console.log(productoId)

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

            // Actualizar la lista de productos si es necesario
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}


function mayusculaPrimeraLetra(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

//Hacer edición y bajas de los productos

