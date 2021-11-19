const {SlashCommandBuilder, quote} = require('@discordjs/builders');
const { MessageActionRow, MessageButton, ButtonInteraction} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yeetmember')
        .setDescription('remove Honkai member role to pinged user')
    ,
    async execute(message)
    {
        //get vice
        const vice = message.member;

        //check if allowed
        if (vice.roles.cache.some(role => role.name === 'Honkai Vice Leader'))
        {
            message.channel.send('You\'re not a vice, fuk off')
        }
        else
        {
            //get pinged member

            //get honkai role
            let honkaiRole = interaction.guild.roles.cache.find(role => role.name === "Honkai Member")


        }
    }
}