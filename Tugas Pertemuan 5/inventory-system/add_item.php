<?php
include 'config.php';

$name = $_POST['name'];
$category = $_POST['category'];
$stock = $_POST['stock'];
$price = $_POST['price'];

$sql = "INSERT INTO items (name, category, stock, price) VALUES ('$name', '$category', $stock, $price)";
if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}

$conn->close();
?>