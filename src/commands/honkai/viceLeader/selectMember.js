const {SlashCommandBuilder, quote} = require('@discordjs/builders');
const { MessageActionRow, MessageButton, ButtonInteraction} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('selectmember')
        .setDescription('give option to what to do with pinged member')
    ,
    async execute(message)
    {
        //get vice
        const vice = message.member;

        //get role
        let honkaiRole = message.guild.roles.cache.find(role => role.name === "Honkai Member")


        //check if allowed
        if (vice.roles.cache.some(role => role.name === 'Honkai Vice Leader'))
        {
            message.channel.send('You\'re not a vice, fuk off')
        }
        else
        {
            //TODO do a drop down selection for this



        }
    }
}