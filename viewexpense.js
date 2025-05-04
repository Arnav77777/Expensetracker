// Function to fetch expenses from the backend with filters
async function fetchExpenses(filters = {}) {
    try {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`viewexpense.php?${queryParams}`); // Fetch data with filters
        if (!response.ok) {
            throw new Error('Failed to fetch expenses');
        }
        const expenses = await response.json(); // Parse the JSON response
        renderExpenses(expenses); // Render the expenses in the table
    } catch (error) {
        console.error('Error fetching expenses:', error);
        alert('Could not load expenses. Please try again later.');
    }
}

// Function to render expenses in the table
function renderExpenses(expenses) {
    const tableBody = document.getElementById('expenseTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing rows

    expenses.forEach((expense) => {
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = expense.expense_date; // Use the correct field name from the backend
        row.insertCell(1).innerText = expense.category;
        row.insertCell(2).innerText = expense.amount;
        row.insertCell(3).innerText = expense.description;

        const actionsCell = row.insertCell(4);
        actionsCell.innerHTML = `<button onclick="deleteExpense(${expense.id})">Delete</button>`;
    });
}

// Function to delete an expense
async function deleteExpense(expenseId) {
    if (!confirm('Are you sure you want to delete this expense?')) {
        return;
    }

    try {
        const response = await fetch(`deleteexpense.php?id=${expenseId}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('Failed to delete expense');
        }
        alert('Expense deleted successfully!');
        fetchExpenses(); // Refresh the table
    } catch (error) {
        console.error('Error deleting expense:', error);
        alert('Could not delete expense. Please try again later.');
    }
}

// Handle filter form submission
document.getElementById('filterForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    const filters = {
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        category: document.getElementById('category').value,
    };

    fetchExpenses(filters); // Fetch expenses with filters
});

// Handle export button click
document.getElementById('exportButton').addEventListener('click', () => {
    window.location.href = 'exportexpenses.php';
});

// Fetch and render expenses when the page loads
document.addEventListener('DOMContentLoaded', () => fetchExpenses());