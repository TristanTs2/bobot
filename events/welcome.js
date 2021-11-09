module.exports  = async (member,client) => {
    let channel = member.guild.channels.cache.get(member.guild.systemChannelId);
    channel.send(`Bonjour, <@${member.user.id}> ! `);
}