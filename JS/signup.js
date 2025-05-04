document.getElementById('signupForm').addEventListener('submit', function(event) {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!username || !email || !password) {
        alert('Please fill in all required fields.');
        event.preventDefault(); // Prevent form submission
    } else {
        // Logic for handling sign up (e.g., API call)
        alert('Sign up successful!'); // Placeholder for actual sign up logic
    }
});