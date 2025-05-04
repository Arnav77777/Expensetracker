document.getElementById('expenseForm').addEventListener('submit', function (event) {
    const date = document.getElementById('date').value;
    const amount = document.getElementById('amount').value;
  
    if (!date || !amount) {
      alert('Please fill in all required fields.');
      event.preventDefault(); // Prevent form submission
    }
  });