const {SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('notification')
        .setDescription('Turn on/off notification that you want to get')
        .addSubcommand(subcommand => subcommand
                .setName('abyss')
                .setDescription('Abyss alert, will warn you when abyss is started/ended and 15 in before it end')
        )
        .addSubcommand(subcommand => subcommand
            .setName('simbattle')
            .setDescription('Sim Battle alert')
        )
    ,

    async execute(message) {

        //get all channel and roles, and member
        //TODO make a class to speedrun this, this shit long
        const member = message.member
        let abyss = message.guild.roles.cache.find(role => role.name === "Abyss");
        let sim = message.guild.roles.cache.find(role => role.name === "Sim Battle");


        switch (message.options.getSubcommand()) {
            case 'abyss':
                //if user have it, remove
                if (member.roles.cache.some(role => role.name === 'Abyss'))
                {
                    message.reply('You will now stop getting alert for Abyss')
                    member.roles.remove(abyss)
                }
                else
                {
                    message.reply('You will now get alert for Abyss')
                    member.roles.add(abyss)
                }
                break;
            case 'simbattle':
                if (member.roles.cache.some(role => role.name === 'Sim Battle'))
                {
                    message.reply('You will now stop getting alert for Sim Battle')
                    member.roles.remove(sim)
                }
                else
                {
                    message.reply('You will now get alert for Sim Battle')
                    member.roles.add(sim)
                }
                break;
            default:
        }
    }
}