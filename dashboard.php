<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header('Location: login.html');
    exit;
}

// Debugging: Output the user_id stored in the session
echo 'Debugging: user_id in session is ' . $_SESSION['user_id'];

include 'includes/db.php';

$user_id = $_SESSION['user_id'];

// Fetch the username from the database
$query = "SELECT username FROM users WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param('i', $user_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

$username = $user['username'] ?? 'User'; // Default to 'User' if username is not found
?>