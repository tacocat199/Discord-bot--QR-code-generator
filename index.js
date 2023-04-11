const Discord = require('discord.js');
const qrcode = require('qrcode');
const qrimage = require('qr-image');

const bot = new Discord.Client();

bot.on('message', async message => {
    // Check if the message starts with the command
    if (message.content.startsWith('!qr')) {
        // Extract the argument from the message
        const argument = message.content.split(' ')[1];
        // Generate the QR code from the argument
        const qrCode = await qrcode.toBuffer(argument);
        // Convert the buffer to an image file
        const qrImage = qrimage.imageSync(qrCode, { type: 'png '});
        // Send the image file as an attachment in a new message
        await message.channel.send(new Discord.MessageAttachment(qrImage, 'qr-code.png'));
    }
});

bot.login('MTA5NTM0NzAxNjM5MDkzODc2OQ.G7FHMz.9kF5YyrOEDm6qoQP48CH-YVrXEL-tGLryFrswU');