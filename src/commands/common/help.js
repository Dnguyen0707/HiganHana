const {SlashCommandBuilder} = require("@discordjs/builders");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Ask for help (will DM you)')
    ,
    async execute(message) {

    }
}