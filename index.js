const Discord = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();

const client = new Discord.Client();

const commandHandler = require('./commandHandler');

client.on('ready', () => {
  console.log(`Bot logged in as ${client.user.tag}`);
  client.user.setActivity('Use :help');
});

client.on('message', (message) => {
  if (message.author.id === client.user.id) return;
  commandHandler(message);
});

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => client.login(process.env.BOT_TOKEN))
  .catch(console.err);
