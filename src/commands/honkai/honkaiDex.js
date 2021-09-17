const {SlashCommandBuilder, channelMention} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js')
const fs = require('fs');

//for new player
module.exports = {
    data: new SlashCommandBuilder()
        .setName('honkaidex')
        .setDescription('Your friendly HonkaiDex, it\'s like Pokedex but for Honkai')
        .addSubcommand(subcommand =>
            subcommand
                .setName('search')
                .setDescription('Search up a battlesuit by abbreviation or full name (It\'s case sensitive sadly for now)')
                .addStringOption(option => option.setName('target').setDescription('Target battlesuit name').setRequired(true))
        )
    //TODO add later
        // .addSubcommand(subcommand =>
        //     subcommand
        //         .setName('character')
        //         .setDescription('give all the battlesuit of the character')
        //         .addStringOption(option => option.setName('target').setDescription('Character name').setRequired(true))
        // )
    ,
    async execute(interaction, bot, args) {

        let jsonHonkaiDex;
        let honkaiDex;

        //reading setting
        try {
            jsonHonkaiDex = fs.readFileSync('./resources/honkaiDex.json')
            honkaiDex = JSON.parse(jsonHonkaiDex)
        } catch (err) {
            console.log(err)
            return
        }
        let input = interaction.options.getString('target');

        //TODO make this not case sensitive
        switch (interaction.options.getSubcommand()) {
            case 'search':
                let keys = Object.keys(honkaiDex)
                let results = []

                keys.forEach(key => {
                    let char = honkaiDex[key]
                    char.forEach(sub => {
                        let found = sub.fullName === input || sub.short.includes(input)
                        if (found) {
                            results.push(sub)
                        }
                    })
                })
                let info = results[0]

                //create embed with info
                const embed = new MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle(info.fullName)
                    .setThumbnail(typePic(info.type))
                    .setDescription('Short: ' + info.short)
                    .setImage(info.picture)
                    .addFields(
                        {name: 'Document Guide', value: linkToString(info.document), inline: true},
                        {name: 'Video Guide', value: linkToString(info.video), inline: true}
                    )

                interaction.channel.send({embeds: [embed]})
                break;
            case 'character':
                break;
            default:

        }
    },
};

function linkToString(input)
{
    const link = JSON.stringify(input).replace(/\"/g, "")
    if (link)
    {
        return '[Click here]' + '(' + JSON.stringify(input).replace(/\"/g, "") + ')'
    }
    return 'TBA'
}

function typePic(input)
{
    switch (input)
    {
        case 'MECH':
            return 'https://static.wikia.nocookie.net/honkaiimpact3_gamepedia_en/images/f/fe/MECH_%28Icon%29.png/revision/latest?cb=20180420045731'
        case 'PSY':
            return 'https://static.wikia.nocookie.net/honkaiimpact3_gamepedia_en/images/a/ac/PSY_%28Icon%29.png/revision/latest?cb=20180420045834'
        case 'BIO':
            return 'https://static.wikia.nocookie.net/honkaiimpact3_gamepedia_en/images/4/48/BIO_%28Icon%29.png/revision/latest?cb=20180420045804'
        case 'QUA':
            return 'https://static.wikia.nocookie.net/honkaiimpact3_gamepedia_en/images/3/3c/QUA_%28Icon%29.png/revision/latest?cb=20190710035412'
        case 'IMA':     //Not Announced
            return ""

    }
}