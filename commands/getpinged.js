const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getpinged')
        .setDescription('Receive a ping !')
    ,async execute(interaction) {
        let userid = interaction.member.user.id,
        username = interaction.member.user.username;
        await interaction.reply(`<@${userid}> hello ${username}`);
    }
}