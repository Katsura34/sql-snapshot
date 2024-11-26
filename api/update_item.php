<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $sql = "UPDATE items SET name = ?, quantity = ?, price = ?, image = ? WHERE id = ?";
    
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['name'],
            $data['quantity'],
            $data['price'],
            $data['image'],
            $data['id']
        ]);
        
        echo json_encode(['message' => 'Item updated successfully']);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>