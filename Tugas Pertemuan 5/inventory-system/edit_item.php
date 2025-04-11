<?php
include 'config.php';

$id = $_POST['id'];
$name = $_POST['name'];
$category = $_POST['category'];
$stock = $_POST['stock'];
$price = $_POST['price'];

$sql = "UPDATE items SET name='$name', category='$category', stock=$stock, price=$price WHERE id=$id";
if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}

$conn->close();
?>