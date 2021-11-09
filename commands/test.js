const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Used for console !')
            
    ,async execute(interaction) {
        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('yesbutton')
					.setLabel('Yes')
					.setStyle(`SUCCESS`),

                new MessageButton()
					.setCustomId('nopbutton')
					.setLabel('No')
					.setStyle('DANGER')
			,);

        const client = interaction.client;
        const newEmbed = new MessageEmbed()
            .setColor('#FFFFFF')
            .setTitle('Wanna play a game ?')
            .setDescription(`${client.user.tag}\nping :${client.ws.ping}ms`);
            for(let j = 0; j<2; j++) {

            }

        const gameField = new MessageEmbed()
            .setColor('#FFFFFF')
            .setTitle('Game :')
            .setDescription(`${client.user.tag}\nping :${client.ws.ping}ms`);

        const filter = i => (i.customId === 'yesbutton' || i.customId === 'nopbutton');
        const collector = interaction.channel.createMessageComponentCollector(
            { componentType: "BUTTON",filter,time:50000, max: 1 }
        );
        
		const message = await interaction.reply(
            { /*content: 'Pong!',*/embeds: [newEmbed], components: [row] }
        );

        collector.on('collect',async i => {

            if (i.customId === 'yesbutton' ) {
                for(let i = 0;i<5;i++) gameField.setFields("bob");
                i.message.edit({ embeds: [gameField], components: [] });
                i.message.react('👍').then(() => i.message.react('👎'));
            }

            else if (i.customId === 'nopbutton') {
                i.reply(`Nope.`);
            }

        })
        collector.on('end',collected => {
            console.log(`Collected ${collected.size} interactions`);
        })       

    }
}