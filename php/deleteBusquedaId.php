<!-- Borrado introduciendo el id -->

<?php
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "prueba";

    $idBaja = isset($_POST['idBaja']) ? $_POST['idBaja'] : null;

    if ($idBaja !== null) {
        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) {
            die("Conexión fallida: " . $conn->connect_error);
        }

        $sql = "DELETE FROM product WHERE id_producto = $idBaja";

        if ($conn->query($sql) === TRUE) {
            echo "Producto eliminado correctamente";
        } else {
            echo "Error al eliminar el producto: " . $conn->error;
        }

        $conn->close();
    } else {
        echo "Error: El campo ID está vacío.";
    }
?>
