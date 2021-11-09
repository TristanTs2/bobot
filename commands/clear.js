const { MessageEmbed, Permissions } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears the entire channel !')

    ,async execute(interaction) {

        if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return await interaction.reply('Vous n\'avez pas les permissions nécessaires !');
        
        let channelid = interaction.channel.id;
        let client = interaction.client;
        let newEmbed = new MessageEmbed()
            .setTitle('Channel cleared !')
            .setColor('#FFFFFF')
            .setDescription(`${client.user.tag}\nping :${client.ws.ping}ms`);
            
        await interaction.channel.clone().then(channel =>
            channel.send({embeds: [newEmbed]})
        );
        
        await interaction.reply('Processing...')
        interaction.channel.delete();
    }
}