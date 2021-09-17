const {SlashCommandBuilder, quote} = require('@discordjs/builders');
const { MessageActionRow, MessageButton, ButtonInteraction} = require('discord.js');

//for new player
module.exports = {
    data: new SlashCommandBuilder()
        .setName('yahallo')
        .setDescription('Give role'),
    async execute(interaction, args, bot)
    {
        //get member
        const member = interaction.member;

        //check if the user already have the role
        if (member.roles.cache.some(role => role.name === 'Member'))
        {
            interaction.channel.send('Hey, you already have the Member role, what are you doing?\n' +
                'If you are redoing this to get in the Honkai guild, then just ask one of the Leader/Vice Leader');
        }
        else
        {
            const row = new MessageActionRow().addComponents(
                new MessageButton()
                    .setLabel("Yes but applying")
                    .setCustomId('yes_applying')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setLabel("Yes and already in")
                    .setCustomId('yes_already')
                    .setStyle("SECONDARY"),
                new MessageButton()
                    .setLabel("No")
                    .setCustomId('no')
                    .setStyle('SUCCESS')
            )

            interaction.channel.send({content: 'Did you came from Honkai? If not, then select no', components: [row] })

            const filter = (input) => {
                if (input.member === member) return true;
                return interaction.reply({content: 'You can\'t use this button'});
            }

            const collect = interaction.channel.createMessageComponentCollector({
                filter,
                max: 1,
            });

            collect.on('end', (ButtonInteraction) => {
               const id = ButtonInteraction.first().customId;

                let memberRole = interaction.guild.roles.cache.find(role => role.name === "Member");
                let honkaiRole = interaction.guild.roles.cache.find(role => role.name === "Honkai Member");
                let pendingRole = interaction.guild.roles.cache.find(role => role.name === "Pending Honkai Member");

                switch (id)
                {
                    case 'yes_applying':
                        interaction.channel.send('Awesome! I\'ll let Kiyan or the Vice Leader know, while waiting, feel free to check out the server');
                        interaction.channel.send('Also, please change your nick to the in-game one');
                        member.roles.add(pendingRole)
                        break;

                    case 'yes_already':
                        interaction.channel.send('I\'m glad you joined us, I\'ll give you the Honkai Member role, and check out the server');
                        interaction.channel.send('Also, please change your nick to the in-game one');
                        member.roles.add(honkaiRole)
                        break;

                    case 'no':
                        interaction.reply('Welcome to the server!')
                        break;

                    default:
                    //Do nothing
                }
                member.roles.add(memberRole)


                const channel = interaction.guild.channels.cache.find(room => room.name === "chill-chat");
                channel.send(`Everyone welcome ${member}! Enjoy your stay`)
            });
        }
    },
};