document.addEventListener('DOMContentLoaded', () => {
    // Check if the user is authenticated
    const userToken = localStorage.getItem('userToken');

    if (!userToken) {
        // User is not authenticated, redirect to the login page
        window.location.href = '/login.html'; // Change to your login page URL
    }
});

// Logout button click event
const logoutButton = document.getElementById('logout-button'); // Assuming you have a logout button element
logoutButton.addEventListener('click', () => {
    // Remove the token from localStorage
    localStorage.removeItem('userToken');
    
    // Redirect to the login page
    window.location.href = '/login.html'; // Change to your login page URL
});
