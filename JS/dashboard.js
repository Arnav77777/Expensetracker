// Function to fetch and display the monthly expense summary
async function fetchSummary() {
    try {
        const response = await fetch('getsummary.php');
        if (!response.ok) {
            throw new Error('Failed to fetch summary data');
        }
        const data = await response.json();

        // Debugging log: Check the fetched data
        console.log('Summary Data:', data);

        // Display total expenses
        document.getElementById('totalExpenses').innerText = `₹${parseFloat(data.totalExpenses).toFixed(2)}`;

        // Prepare data for the chart
        const categories = data.categoryData.map(item => item.category);
        const amounts = data.categoryData.map(item => parseFloat(item.total));

        // Debugging logs: Check the categories and amounts
        console.log('Categories:', categories);
        console.log('Amounts:', amounts);

        // Render the chart
        renderCategoryChart(categories, amounts);
    } catch (error) {
        console.error('Error fetching summary data:', error);
        alert('Could not load summary data. Please try again later.');
    }
}

// Function to render the category-wise expense chart
function renderCategoryChart(categories, amounts) {
    // Debugging log: Check the data being passed to the chart
    console.log('Rendering Chart with:', { categories, amounts });

    const ctx = document.getElementById('categoryChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                label: 'Expenses by Category (₹)',
                data: amounts,
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9F40'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });
}

// Fetch and display the summary when the page loads
document.addEventListener('DOMContentLoaded', fetchSummary);