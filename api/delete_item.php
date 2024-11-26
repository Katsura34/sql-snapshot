<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'];
    
    $sql = "DELETE FROM items WHERE id = ?";
    
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id]);
        
        echo json_encode(['message' => 'Item deleted successfully']);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>