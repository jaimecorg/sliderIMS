<?php
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "prueba";

    $id = $_GET['id'];

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM product WHERE id_producto = $id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $producto = [
            'id' => $row['id_producto'],
            'nombre' => $row['nombre']
            /* 'precio' => $row['precio'],
            'visual' => $row['visual'],
            'fechaInicio' => $row['fechaInicio'],
            'fechaFinal' => $row['fechaFinal'] */
        ];
        $response = [
            'success' => true,
            'producto' => $producto
        ];
    } else {
        $response = [
            'success' => false,
            'message' => 'No se encontró el producto'
        ];
    }

    $conn->close();

    echo json_encode($response);
?>


