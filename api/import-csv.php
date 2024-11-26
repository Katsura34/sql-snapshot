<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['csvFile'])) {
        $csvFile = $_FILES['csvFile']['tmp_name'];
        $handle = fopen($csvFile, "r");
        
        // Skip header row
        fgetcsv($handle);
        
        while (($data = fgetcsv($handle)) !== FALSE) {
            $name = $data[0];
            $quantity = $data[1];
            $price = $data[2];
            $image = $data[3];
            
            $sql = "INSERT INTO items (name, quantity, price, image) VALUES (?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$name, $quantity, $price, $image]);
        }
        
        fclose($handle);
        echo json_encode(['success' => true, 'message' => 'CSV data imported successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'No CSV file uploaded']);
    }
}