<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/styles.css">
    <title>Listado de Archivos</title>
</head>
<body>
    <img src="../img/portada.png" alt="">

    <div class="contendedor">
        <h1>Listado de Archivos</h1>

        <a href="../index.html">Inicio</a>
    
        <div id="contenedorArchivos">
            <?php
                // Directorio donde se encuentran los archivos
                $directorio = '../img'; // Ajusta la ruta según tu estructura de carpetas
                
                // Obtener lista de archivos
                $archivos = scandir($directorio);
                
                // Mostrar lista de archivos
                echo "<table><tr><td>Visual</td></tr>";
                foreach ($archivos as $archivo) {
                    if ($archivo != "." && $archivo != "..") {
                        echo "<tr><td>$archivo</td><tr>";
                    }
                }
                echo "</table";
            ?>
        </div>
    </div>
</body>
</html>
