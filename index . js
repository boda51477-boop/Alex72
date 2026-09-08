const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');
const express = require('express');
const app = express();

const TOKEN = process.env.TOKEN;
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

client.once('ready', () => console.log(`✅ Alex صاحي: ${client.user.tag}`));

client.on('messageCreate', message => {
  if(message.author.bot) return;
  if(message.content.toLowerCase().includes('كس')) {
    message.delete();
    message.member.kick('شتم');
  }
});

client.login(TOKEN);
app.get('/', (req, res) => res.send('شغال'));
app.listen(3000);
