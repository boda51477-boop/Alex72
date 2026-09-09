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
// امر طرد !kick
client.on('messageCreate', async message => {
  if (!message.content.startsWith('!kick') || message.author.bot) return;

  // لازم يكون ادمن
  if (!message.member.permissions.has('KickMembers')) {
    return message.reply('❌ لازم يكون عندك صلاحية `Kick Members` عشان تطرد');
  }

  const member = message.mentions.members.first();
  if (!member) return message.reply('❌ منشن العضو اللي عايز تطرده\nمثال: `!kick @اسم`');

  if (!member.kickable) return message.reply('❌ مقدرش اطرد العضو ده. الرتبة بتاعته اعلى مني');

  const reason = message.content.split(' ').slice(2).join(' ') || 'بدون سبب';

  try {
    await member.kick(reason);
    message.channel.send(`✅ تم طرد ${member} \n**السبب:** ${reason}`);
  } catch (err) {
    message.reply('❌ حصل خطأ وانا بطرد');
  }
});
// ID روم الترحيب ꧁༺-الترحيب-༻꧂
const WELCOME_CHANNEL_ID = '1545828004238856242';

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
  if (!channel) return console.log('ملقتش روم الترحيب بالID'); 
  channel.send(`✨ **اهلاً وسهلاً بك في ${member.guild.name}** ${member} ✨\nاتمنى تستمتع معانا وتكون اضافة قوية 🔥`);
});
