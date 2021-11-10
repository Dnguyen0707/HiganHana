const fs = require("fs");
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');

module.exports = (bot) => {
    bot.handleCommands = async (commandFolders, path) => {

        bot.commandArray = [];

        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                // Set a new item in the Collection
                // With the key as the common name and the value as the exported module

                bot.commands.set(command.data.name, command);
                bot.commandArray.push(command.data.toJSON());

            }
        }

        const rest = new REST({version: '9'}).setToken(process.env.BOT_TOKEN);

        await (async () => {
            try {
                console.log('Started refreshing application (/) commands.');

                await rest.put(
                    Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                    {body: bot.commandArray},
                );

                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();


    }
}