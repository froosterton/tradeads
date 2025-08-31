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

const CHANNEL_ID = '442709710408515605';
const MESSAGE = '# DM OFFERS @https://media.discordapp.net/attachments/1403173774991560898/1411755087054897312/image.png?ex=68b5cee1&is=68b47d61&hm=deb2cab2796e70844387cc1069f5a83668bc7159e9b16d7b96dafac4fd927ad0&=&format=webp&quality=lossless&width=524&height=279';
const INTERVAL = (10 * 60 + 30) * 1000; // 10 minutes and 30 seconds in milliseconds

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
