<?php
include 'config.php';

$id = $_POST['id'];

$sql = "DELETE FROM items WHERE id=$id";
if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}

$conn->close();
?>