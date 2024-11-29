document.addEventListener('DOMContentLoaded', function () {
    // WhatsApp Contact
    document.getElementById('whatsapp').addEventListener('click', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value ? `*Name:* ${document.getElementById('name').value.trim()}\n` : '';
        const email = document.getElementById('email').value ? `*Email:* ${document.getElementById('email').value.trim()}\n` : '';
        const mess = document.getElementById('message').value?.trim() || 'Hi, *AbsTech*, I saw your portfolio and need your services for my business (please specify).';

        const message = `${name}${email}${mess}`;
        const allmessage = encodeURIComponent(message);

        window.open(`https://wa.me/2348069764769?text=${allmessage}`, "_blank");
    });

    // Phone Call
    document.getElementById('call').addEventListener('click', (e) => {
        e.preventDefault();
        window.open('tel:2348069764769', '_blank');
    });

    // Telegram Contact
    document.querySelector('form').addEventListener('submit', (e) => {
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

        // Replace these placeholders with your Telegram bot's token and chat ID
        const botToken = '8104370142:AAGXey5K2tGVNjgxJccpUkKKk8n1Yqw7VSY';
        const chatId = '5953115505';

        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const data = {
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown',
        };

        // Show a loading notification
        iziToast.info({
            title: 'Sending',
            message: 'Your message is being sent...',
            timeout: 2000,
            position: 'topRight',
        });

        // Send data to Telegram Bot API
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.ok) {
                    iziToast.success({
                        title: 'Success',
                        message: 'Your message was sent successfully!',
                        position: 'topRight',
                    });
                } else {
                    throw new Error('Failed to send message');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                iziToast.error({
                    title: 'Error',
                    message: 'An error occurred while sending your message. Please try again.',
                    position: 'topRight',
                });
            });
    });

    // Email validation function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
