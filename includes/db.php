<?php
$host = 'localhost';
$dbname = 'expense_tracker';
$username = 'root';
$password = ''; // Default XAMPP MySQL password is empty

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>