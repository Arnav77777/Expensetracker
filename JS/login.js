document.getElementById('loginForm').addEventListener('submit', function(event) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please fill in all required fields.');
        event.preventDefault(); // Prevent form submission
    } else {
        // Logic for handling login (e.g., API call)
        alert('Login successful!'); // Placeholder for actual login logic
    }
});