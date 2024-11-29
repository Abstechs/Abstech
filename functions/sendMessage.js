const fetch = require('node-fetch');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow requests from all origins
                'Access-Control-Allow-Methods': 'POST', // Allow only POST requests
            },
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    const { message } = JSON.parse(event.body);

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const data = {
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*', // Allow requests from all origins
                },
                body: JSON.stringify({ success: true }),
            };
        } else {
            const errorDetails = await response.text();
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*', // Allow requests from all origins
                },
                body: JSON.stringify({ error: 'Telegram API error', details: errorDetails }),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow requests from all origins
            },
            body: JSON.stringify({ error: 'Failed to send message', details: error.message }),
        };
    }
};