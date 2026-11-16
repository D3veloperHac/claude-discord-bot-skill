require('dotenv').config();
const { Client, GatewayIntentBits, Events, REST, Routes, ApplicationCommandType } = require('discord.js');

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

if (!token || !clientId) {
  console.error('Missing DISCORD_TOKEN or CLIENT_ID in environment');
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === '!ping') {
    await message.reply('Pong!');
  }
});

client.login(token);

async function registerCommands() {
  const commands = [
    {
      name: 'ping',
      description: 'Replies with pong',
    },
  ];

  const rest = new REST({ version: '10' }).setToken(token);

  try {
    if (guildId) {
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
      console.log('Guild commands registered');
    } else {
      await rest.put(Routes.applicationCommands(clientId), { body: commands });
      console.log('Global commands registered');
    }
  } catch (error) {
    console.error('Failed to register slash commands:', error);
  }
}

registerCommands();
