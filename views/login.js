document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get user input
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // Send a POST request to the login route
            const response = await axios.post('/auth/login', {
                email,
                password,
            });

            if (response.status === 200) {
                // Login was successful
                // Store the user data or token in localStorage
                localStorage.setItem('userToken', response.data.token);

                // Redirect to the home page or another protected page
                window.location.href = '/home.html'; // Change to your protected page
            }
        } catch (error) {
            // Handle login error
            console.error('Login error:', error);
            if (error.response && error.response.status === 401) {
                alert('Invalid email or password');
            } else {
                alert('An error occurred. Please try again later.');
            }
        }
    });
});
