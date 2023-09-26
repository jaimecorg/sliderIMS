<?php
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "prueba";

    $id = isset($_POST['id']) ? $_POST['id'] : null;
    $nombre = isset($_POST['nombre']) ? $_POST['nombre'] : null;
    $precio = isset($_POST['precio']) ? $_POST['precio'] : null;
    $visual = isset($_POST['visual']) ? $_POST['visual'] : null;

    // Validar que todos los datos están presentes
    if ($id !== null && $nombre !== null && $precio !== null && $visual !== null) {
        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) {
            die("Conexión fallida: " . $conn->connect_error);
        }

        $sql = "INSERT INTO product (id_producto, nombre, precio, visual) VALUES ($id, '$nombre', $precio, '$visual')";

        if ($conn->query($sql) === TRUE) {
            echo "Producto insertado correctamente";
        } else {
            echo "Error al insertar el producto: " . $conn->error;
        }

        $conn->close();
    } else {
        echo "Error: Uno o más campos están vacíos.";
    }
?>


