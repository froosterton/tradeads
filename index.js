require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');
const express = require('express');

// Express server to keep the bot alive on Render
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Self-bot is alive!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Self-Bot
const client = new Client({
    // It is recommended to use a proxy to avoid getting your account flagged
    // proxy: "http://127.0.0.1:8888",
    checkUpdate: false,
});

const MESSAGE_TEXT = '# DM OFFERS';
const IMAGE_URL = 'https://cdn.discordapp.com/attachments/<id>/<id>/image.png'; // no query params

await channel.send({ content: MESSAGE_TEXT, files: [IMAGE_URL] });
// or, if you must use a link: await channel.send(`${MESSAGE_TEXT} ${IMAGE_URL}`);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const postMessage = async () => {
        try {
            const channel = await client.channels.fetch(CHANNEL_ID);
            if (channel) {
                await channel.send(MESSAGE);
                console.log(`Message sent to channel ${CHANNEL_ID}`);
            } else {
                console.error(`Could not find channel with ID ${CHANNEL_ID}`);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // Post the message once immediately, then set the interval
    postMessage();
    setInterval(postMessage, INTERVAL);
});

client.login(process.env.USER_TOKEN);
