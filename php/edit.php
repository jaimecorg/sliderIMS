<?php
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "prueba";

    $id = $_POST['id_producto'];
    $nombre = $_POST['nombre'];
    $precio = $_POST['precio'];
    $visual = $_POST['visual'];
    $descripcion = $_POST['descripcion'];
    $duracion = $_POST['duracion'];

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    $sql = "UPDATE product SET nombre='$nombre', precio=$precio, visual='$visual', descripcion='$descripcion', duracion='$duracion' WHERE id_producto=$id";

    if ($conn->query($sql) === TRUE) {
        echo "Producto actualizado correctamente";
    } else {
        echo "Error al actualizar el producto: " . $conn->error;
    }

    $conn->close();

    //echo json_encode($response);
?>


