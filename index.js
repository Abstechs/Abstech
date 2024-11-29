document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value ? `*Name:* ${document.getElementById('name').value.trim()}\n` : '';
    const email = document.getElementById('email').value ? document.getElementById('email').value.trim() : '';
    const mess = document.getElementById('message').value?.trim() || 'Hi, AbsTech. I saw your portfolio and need your services for my business (please specify).';

    // Validate email
    if (!email || !validateEmail(email)) {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a valid email address.',
            position: 'topRight',
        });
        return; // Stop execution if email is invalid
    }

    const message = `${name}*Email:* ${email}\n${mess}`;

    // Show a loading notification
    iziToast.info({
        title: 'Sending',
        message: 'Your message is being sent...',
        timeout: 2000,
        position: 'topRight',
    });

    try {
        // Use the correct Netlify function endpoint
        const response = await fetch('https://abstech.netlify.app/.netlify/functions/sendMessage', {
            method: 'POST',
            mode: 'cors', // Explicitly set CORS mode
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (response.ok) {
            iziToast.success({
                title: 'Success',
                message: 'Your message was sent successfully!',
                position: 'topRight',
            });
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        iziToast.error({
            title: 'Error',
            message: 'An error occurred while sending your message. Please try again.',
            position: 'topRight',
        });
    }
});

// Email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}