const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calculate')
        .setDescription('calculate ingame stuff')
        .addSubcommand(subcommand =>
            subcommand
                .setName('critrate')
                .setDescription('Calculate your valk Crit Rate')
                .addStringOption(option =>
                    option
                        .setName('valkstats').setDescription('The number on your valk page').setRequired(true)
                        )
                .addStringOption(option =>
                    option
                        .setName('valklevel').setDescription('Your Valk\'s level').setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName('bonusrate').setDescription('Only if your Valk have it (EX: DK have Leader skill that have that').setRequired(false)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('stamina')
                .setDescription('Calculte how long it gonna take to regen your stamina')
                .addStringOption(option =>
                    option
                        .setName('current').setDescription('Your current stamina').setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName('max').setDescription('Your max stamina').setRequired(true)
                )

            )
    ,
    async execute(message) {

        switch(message.options.getSubcommand()) {
            case 'critrate':

                let valkStats = Number(message.options.getString('valkstats'));
                let valkLevel = Number(message.options.getString('valklevel'));
                let bonusRate = Number(message.options.getString('bonusrate'));

                if (Number.isNaN(valkStats) || Number.isNaN(valkLevel) || Number.isNaN(bonusRate)) {
                    message.channel.send('I\'m not sure what you typed so try again lmao')
                    break;
                } else if (bonusRate === '') {
                    bonusRate = 0;
                }

                //[CRT STAT ON VALK STATS PAGE / (VALK LEVEL * 5 + 75) * 100 + BONUS RATE
                let retNoBonus = valkStats / (valkLevel * 5 + 75) * 100 + bonusRate

                //TODO reduce down the decimal

                message.channel.send('Your Valk\'s Crit Rate is: ' + retNoBonus)
                break;

            case 'stamina':
                //1 stamina every 6 min
                let current = Number(message.options.getString('current'));
                let max = Number(message.options.getString('max'));

                //error stuff
                if (Number.isNaN(current) || Number.isNaN(max))
                {
                    message.channel.send('I\'m not sure what you typed so try again lmao')
                    break;
                }
                else if (current < max)
                {
                    message.channel.send('Uh no, that\'s not how life work')
                    break;
                }

                let totalMin = ((max - current) * 6)
                let hour = totalMin / 60
                let min = totalMin % 60

                message.channel.send('It\'s gonna take ' + hour + ' hour and '+ min + ' minute to be fully max stamina again')
                break;

            default:

        }
    }

}