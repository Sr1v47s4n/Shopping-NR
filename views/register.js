const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('/auth/register', {
            username,
            email,
            password,
        });

        if (response.status === 201) {
            // Registration was successful, redirect or show a success message
            window.location.href = '/login.html'; // Redirect to login page
        }
    } catch (error) {
        console.error('Registration error:', error);
        // Handle registration error, e.g., display an error message
    }
});
