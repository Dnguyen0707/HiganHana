const {SlashCommandBuilder, channelMention} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js')
const fs = require('fs');
const { execute } = require('./honkaiDex');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calculate')
        .setDescription('calculate ingame stuff')
        .addSubcommand(subcommand =>
            subcommand
                .setName('CritRate')
                .addStringOption(option =>
                    option
                        .setName('ValkStats').setDescription('The number on your valk page').setRequired(true)
                        .setName('ValkLevel').setDescription('Your Valk\'s level').setRequired(true)
                        .setName('BonusRate').setDescription('Only if your Valk have it (EX: DK have Leader skill that have that').setRequired(false)
                        )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('Stamina')

            )
    ,
    async execute(message) {


        switch(message.options.getSubcommand()) {
            
            case 'CritRate':

                if (bonusRate == null)
                {
                    bonusRate = 0;
                }

                //[CRT STAT ON VALK STATS PAGE / (VALK LEVEL * 5 + 75) * 100 + BONUS RATE
                let retNoBonus = ValkStats / (ValkLevel * 5 + 75) * 100 + bonusRate

                message.channel.send('Your Valk\'s Crit Rate is: ' + retNoBonus)
                break;

            case 'Stamina':
                //1 stamina every 6 min
                
                break;

            default:

        }
    }

}