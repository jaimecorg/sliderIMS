<?php
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "prueba";

    $id = isset($_POST['id']) ? $_POST['id'] : null;
    $nombre = isset($_POST['nombre']) ? $_POST['nombre'] : null;
    $precio = isset($_POST['precio']) ? $_POST['precio'] : null;
    $visual = isset($_POST['visual']) ? $_POST['visual'] : null;
    $fechaInicio = isset($_POST['fechaInicio']) ? $_POST['fechaInicio'] : null;
    $fechaFinal = isset($_POST['fechaFinal']) ? $_POST['fechaFinal'] : null;
    $descripcion = isset($_POST['descripcion']) ? $_POST['descripcion'] : null;

    // Validar que todos los datos están presentes
    //    if ($nombre !== null && $precio !== null && $visual !== null && $fechaInicio !== null && $fechaFinal !== null && $descripcion !== null) {

    if ($nombre !== null && $precio !== null && $visual !== null && $descripcion !== null) {
        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) {
            die("Conexión fallida: " . $conn->connect_error);
        }

        $sql = "INSERT INTO product (nombre, precio, visual, fechaInicio, fechaFinal, descripcion) VALUES ('$nombre', $precio, '$visual', '$fechaInicio', '$fechaFinal', '$descripcion')";

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


