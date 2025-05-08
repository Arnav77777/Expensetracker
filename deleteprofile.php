<!-- filepath: d:\Languages\XAMPP\htdocs\Expensetracker\deleteprofile.php -->
<?php
include 'includes/db.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    header('Location: login.html');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = $_SESSION['user_id'];

    // Delete user and their expenses
    $deleteExpensesQuery = "DELETE FROM expenses WHERE user_id = ?";
    $stmt = $conn->prepare($deleteExpensesQuery);
    $stmt->bind_param('i', $user_id);
    $stmt->execute();

    $deleteUserQuery = "DELETE FROM users WHERE id = ?";
    $stmt = $conn->prepare($deleteUserQuery);
    $stmt->bind_param('i', $user_id);

    if ($stmt->execute()) {
        session_destroy(); // End the session
        header('Location: index.html'); // Redirect to home page
        exit;
    } else {
        echo "Error: " . $stmt->error;
    }
}
?>