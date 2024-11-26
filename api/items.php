<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $sql = "SELECT * FROM items";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        echo json_encode($stmt->fetchAll());
        break;
        
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $sql = "INSERT INTO items (name, quantity, price, image) VALUES (?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $input['name'],
            $input['quantity'],
            $input['price'],
            $input['image']
        ]);
        echo json_encode(['id' => $pdo->lastInsertId()]);
        break;
        
    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);
        $sql = "UPDATE items SET name = ?, quantity = ?, price = ?, image = ? WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $input['name'],
            $input['quantity'],
            $input['price'],
            $input['image'],
            $input['id']
        ]);
        echo json_encode(['success' => true]);
        break;
        
    case 'DELETE':
        $id = $_GET['id'];
        $sql = "DELETE FROM items WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
        break;
}