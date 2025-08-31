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
const MESSAGE = '# DM OFFERS https://media.discordapp.net/attachments/1408922934222917702/1411769622499299461/image.png?ex=68b5dc6b&is=68b48aeb&hm=c419229f42d1e5883e7e5c96dbe0e431775063f73dccb119186e9b42609b220a&=&format=webp&quality=lossless&width=595&height=318';
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
