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
// ترحيب في روم ꧁༺-الترحيب-༻꧂
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === '꧁༺-الترحيب-༻꧂');
  if (!channel) return; // لو ملقاش الروم مش هيبعت
  channel.send(`✨ **اهلاً وسهلاً بك في ${member.guild.name}** ${member} ✨\nاتمنى تستمتع معانا وتكون اضافة قوية 🔥`);
});
// امر مسح الشات!clear
client.on('messageCreate', async message => {
  if (!message.content.startsWith('!clear') || message.author.bot) return;

  // لازم يكون ادمن عشان يمسح
  if (!message.member.permissions.has('ManageMessages')) {
    return message.reply('❌ لازم يكون عندك صلاحية `Manage Messages` عشان تمسح');
  }

  const args = message.content.split(' ');
  const amount = parseInt(args[1]) + 1; // +1 عشان يمسح امر!clear نفسه

  if (isNaN(amount) || amount < 2 || amount > 100) {
    return message.reply('❌ استخدم كده: `!clear 10` اقصى حاجة 99');
  }

  try {
    await message.channel.bulkDelete(amount, true);
    message.channel.send(`✅ تم مسح ${amount - 1} رسالة`).then(msg => setTimeout(() => msg.delete(), 3000));
  } catch (err) {
    message.reply('❌ مقدرتش امسح. الرسايل القديمة اكتر من 14 يوم مبتتمسحش');
  }
});
