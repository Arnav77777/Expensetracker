<?php
include 'includes/db.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    header('Location: login.html');
    exit;
}

$user_id = $_SESSION['user_id'];
$currentMonth = date('Y-m-01'); // First day of the current month
$nextMonth = date('Y-m-01', strtotime('+1 month')); // First day of the next month

// Query to calculate total expenses for the current month
$totalQuery = "SELECT SUM(amount) AS total FROM expenses WHERE user_id = ? AND expense_date >= ? AND expense_date < ?";
$stmt = $conn->prepare($totalQuery);
$stmt->bind_param('iss', $user_id, $currentMonth, $nextMonth);
$stmt->execute();
$totalResult = $stmt->get_result();
$totalExpenses = $totalResult->fetch_assoc()['total'] ?? 0;

// Query to calculate category-wise expenses for the current month
$categoryQuery = "SELECT category, SUM(amount) AS total FROM expenses WHERE user_id = ? AND expense_date >= ? AND expense_date < ? GROUP BY category";
$stmt = $conn->prepare($categoryQuery);
$stmt->bind_param('iss', $user_id, $currentMonth, $nextMonth);
$stmt->execute();
$categoryResult = $stmt->get_result();

$categoryData = [];
while ($row = $categoryResult->fetch_assoc()) {
    $categoryData[] = $row;
}

// Return the data as JSON
header('Content-Type: application/json');
echo json_encode([
    'totalExpenses' => $totalExpenses,
    'categoryData' => $categoryData
]);
?>