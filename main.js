require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const commands = [];
const config = require('./config.json')
const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MEMBERS] });
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
client.commands = new Collection;

for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name,command);
}

client.on('ready', async() => {
    try {
        console.log('Started refreshing application (/) commands.');

    await rest.put(
        Routes.applicationGuildCommands(client.user.id, config.guildId),
        { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }

    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('Bob supremacy.',{type: 'WATCHING'})
});


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName)
    if(!command) return;
    
    try { 
        await command.execute(interaction);

    }
    catch(error) {
        console.log(error);
    }
    
});

client.on('guildMemberAdd',(member) => require('./events/welcome')(member,client));

client.login(process.env.TOKEN);