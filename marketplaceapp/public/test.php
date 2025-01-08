<?php
header('Content-Type: application/json');
echo json_encode([
    'status' => 'API is working',
    'url' => $_SERVER['REQUEST_URI'],
    'method' => $_SERVER['REQUEST_METHOD']
]);
?>
