<?php
    $directorio = '../img'; // Ruta a tu carpeta
    $archivos = scandir($directorio);

    // Filtra los archivos y excluye "." y ".."
    $archivos = array_filter($archivos, function($archivo) {
        return !in_array($archivo, ['.', '..']);
    });

    header('Content-Type: application/json');
    echo json_encode($archivos);
?>

