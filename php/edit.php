<?php
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "prueba";

    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $precio = $_POST['precio'];
    $visual = $_POST['visual'];

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    $sql = "UPDATE product SET nombre='$nombre', precio=$precio, visual='$visual' WHERE id_producto=$id";

    if ($conn->query($sql) === TRUE) {
        $response = ['success' => true, 'message' => 'Producto actualizado correctamente'];
    } else {
        $response = ['success' => false, 'message' => 'Error al actualizar el producto: ' . $conn->error];
    }

    $conn->close();

    echo json_encode($response);
?>


