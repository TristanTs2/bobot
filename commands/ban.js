const { MessageEmbed, Permissions, Options } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban the selected user !')
        .addUserOption(option => option
            .setName('username')
            .setDescription('User to ban !')
            .setRequired(true)
            )
        .addStringOption(option => option
            .setName('reason')
            .setDescription('Set the reason for the ban')
            .setRequired(false)
            )

    ,async execute(interaction) {

        if(!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return await interaction.reply('Vous n\'avez pas les permissions nécessaires !');
        
        let username = interaction.options.getUser('username');
        let reason = interaction.options.getString('reason');
        let userid = await interaction.guild.members.cache.get(username.id);
        userid.ban({reason:reason});
        let newEmbed = new MessageEmbed()
            .setTitle(`L'utilisateur ${username.username} à bien été banni`)
            .setColor('#FFFFFF')
            .setDescription(`Raison: ${reason}`);
            
        
        
        await interaction.reply(
            {embeds: [newEmbed]}
        )
        console.log(username);
        
    }
}