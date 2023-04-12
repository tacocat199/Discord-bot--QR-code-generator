require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const qrcode = require('qrcode');
const qrimage = require('qr-image');

const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent] });

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);

    // Define the slash command
    const command = {
        name: 'qr',
        description: 'Generate a QR code',
        options: [
            {
                name: 'input',
                description: 'The input to generate the QR code from',
                type: 3,
                required: true
            }
        ]
    };

    // Register the slash command with Discord
    bot.application.commands.create(command);
});

bot.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName == 'qr') {
        const input = options.getString('input');

        await interaction.reply(`Generating QR code for ${input}...`);

        const qrCode = await qrcode.toBuffer(input);
        const qrImage = qrimage.imageSync(qrCode, { type: 'png' });

        await interaction.followUp({ files: [qrImage] });
    }
});

bot.on('messageCreate', async (message) => {
    if (!message.content.startsWith('!qr')) return;

    const input = message.content.slice(4);

    if (!input) {
        return message.reply('Please provide input to generate the QR code from!');
    }

    const qrCode = await qrcode.toBuffer(input);
    const qrImage = qrimage.imageSync(qrCode, {
        type: 'png'
    });

    await message.channel.send({
        files: [qrImage]
    });
});

bot.login(process.env.BOT_TOKEN);