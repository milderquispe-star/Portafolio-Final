<?php
header('Content-Type: application/json; charset=utf-8');

$servidor = "TU_SERVIDOR";
$usuario = "TU_USUARIO";
$password = "TU_CONTRASEÑA";
$base_datos = "TU_BASE_DE_DATOS";

$conexion = new mysqli($servidor, $usuario, $password, $base_datos);

if ($conexion->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Error de conexión con la base de datos.']);
    exit;
}

$conexion->set_charset("utf8mb4");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre  = trim($_POST['nombre'] ?? '');
    $email   = trim($_POST['email'] ?? '');
    $mensaje = trim($_POST['mensaje'] ?? '');

    if ($nombre === '' || $email === '' || $mensaje === '') {
        echo json_encode(['status' => 'error', 'message' => 'Por favor completa todos los campos.']);
        exit;
    }

    $stmt = $conexion->prepare("INSERT INTO mensajes (nombre, email, mensaje) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nombre, $email, $mensaje);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => '¡Mensaje enviado con éxito! Gracias por contactarme.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No se pudo guardar el mensaje.']);
    }

    $stmt->close();
}

$conexion->close();
?>