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

const MESSAGE_TEXT = '# DM OFFERS @https://media.discordapp.net/attachments/1403173774991560898/1412124048732721203/image.png?ex=68b72681&is=68b5d501&hm=aa3cd0382fdaf7bb6e32b4bd90538fd38362133164b0d7183b5d9dc185f7b350&=&format=webp&quality=lossless&width=523&height=283';
const CHANNEL_ID = process.env.CHANNEL_ID; // Add this to your .env file
const INTERVAL = 10 * 60 * 1000 + 30 * 1000; // 10 minutes and 30 seconds in milliseconds

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const postMessage = async () => {
        try {
            const channel = await client.channels.fetch(CHANNEL_ID);
            if (channel) {
                await channel.send(MESSAGE_TEXT);
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
