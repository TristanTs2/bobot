const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Get a link to invite bobot to your server !'),
    async execute(interaction) {
        client = interaction.client;
        let newEmbed = new MessageEmbed()
            .setTitle('Bobot joined the battle !')
            .setDescription(`[Get invite link here](${config.inviteLink})`);

        await interaction.reply(
            {embeds: [newEmbed]});
    }
}