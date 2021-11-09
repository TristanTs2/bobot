const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Shows the ping of the bot')

    ,async execute(interaction) {
        
        let client = interaction.client;
        let newEmbed = new MessageEmbed()
            .setTitle('Pong')
            .setDescription(`${client.user.tag}\nping :${client.ws.ping}ms`);
                
        await interaction.reply(
            {embeds: [newEmbed]}
        );
    }
}