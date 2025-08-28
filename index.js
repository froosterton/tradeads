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
const MESSAGE = '# DM OFFERS @https://media.discordapp.net/attachments/442709710408515605/1410457162731356170/image.png?ex=68b11618&is=68afc498&hm=5251dd95e09ac1f37716763412c19f51cc49f61341b0d51db086a1bdbb6fcc9b&=&format=webp&quality=lossless&width=197&height=231';
const INTERVAL = 16 * 60 * 1000; // 16 minutes in milliseconds

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
