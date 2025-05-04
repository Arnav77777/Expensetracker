<?php
include 'includes/db.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    header('Location: login.html');
    exit;
}

$user_id = $_SESSION['user_id'];
$startDate = $_GET['startDate'] ?? null;
$endDate = $_GET['endDate'] ?? null;
$category = $_GET['category'] ?? null;

$query = "SELECT * FROM expenses WHERE user_id = ?";
$params = [$user_id];
$types = "i";

if ($startDate) {
    $query .= " AND expense_date >= ?";
    $params[] = $startDate;
    $types .= "s";
}

if ($endDate) {
    $query .= " AND expense_date <= ?";
    $params[] = $endDate;
    $types .= "s";
}

if ($category) {
    $query .= " AND category = ?";
    $params[] = $category;
    $types .= "s";
}

$stmt = $conn->prepare($query);
$stmt->bind_param($types, ...$params);
$stmt->execute();
$result = $stmt->get_result();

$expenses = [];
while ($row = $result->fetch_assoc()) {
    $expenses[] = $row;
}

header('Content-Type: application/json');
echo json_encode($expenses);
?>