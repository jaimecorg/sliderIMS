<?php
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "prueba";

    $id = $_GET['id'];

    //$idBaja = isset($_POST['idBaja']) ? $_POST['idBaja'] : null;

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    $sql = "DELETE FROM product WHERE id_producto = $id";

    if ($conn->query($sql) === TRUE) {
        $response = ['message' => 'Producto eliminado correctamente'];
        echo json_encode($response);
    } else {
        $response = ['message' => 'Error al eliminar el producto'];
        echo json_encode($response);
    }

    $conn->close();
?>
