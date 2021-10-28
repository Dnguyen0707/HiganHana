const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Ask for help (will DM you)')
    ,
    async execute(message) {

        //embed builder
        const embed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('So you asked for help')
            .addFields(
                {name: '/honkaiDex', value: ''},
                {name: '/help', value: ''}
            )




        //DM the message
    }
}