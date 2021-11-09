const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trollé')
        .setDescription('Get trolled.')
    ,async execute(interaction) {
        await interaction.reply(`Trolléééééééééééééééééééééééééééééééééééé !`);
    }
}