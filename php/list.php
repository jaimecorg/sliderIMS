<?php
    $servername = "localhost"; // Cambia esto si tu servidor MySQL no está en localhost
    $username = "root";
    $password = "root";
    $dbname = "prueba";

    // Crear la conexión
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verificar la conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM product";
    $result = $conn->query($sql);

    $products = array();

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
    }

    echo json_encode($products);

    $conn->close();
?>


