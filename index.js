require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const qrcode = require('qrcode');
const qrimage = require('qr-image');

const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent] });

bot.on('messageCreate', async message => {
    console.log(message);
    // Check if the message starts with the command
    if (message.content.startsWith('!qr')) {
        // Extract the argument from the message
        const argument = message.content.split(' ')[1];
        if (typeof argument !== 'string') {
            return message.channel.send('Please provide a valid input.');
        }
        // Send a response message with the input message content
        await message.channel.send(`Generating QR code for ${argument}...`);
        // Generate the QR code from the argument
        const qrCode = await qrcode.toBuffer(argument);
        // Convert the buffer to an image file
        const qrImage = qrimage.imageSync(qrCode, { type: 'png'});
        // Send the image file as an attachment in a new message
        await message.channel.send({ files: [qrImage] });
    }
});

bot.login(process.env.BOT_TOKEN);