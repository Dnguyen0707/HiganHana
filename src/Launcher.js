//Required setup stuff lmao
const fs = require('fs');
require('dotenv').config();
const {Client, Intents, Collection} = require('discord.js');
const bot = new Client({intents: [Intents.FLAGS.GUILDS]});

//collection
bot.commands = new Collection();

//read files
const events = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
const functions = fs.readdirSync('./src/functions').filter(file => file.endsWith('.js'));
const commandFolder = fs.readdirSync('./src/commands');


//run and login
(async () => {
    for (const file of functions)
    {
        require(`./functions/${file}`)(bot);
    }
    bot.handleEvents(events, './src/events');
    bot.handleCommands(commandFolder, './src/commands');


    bot.login(process.env.BOT_TOKEN).then(r => console.log("Bot is online"));
})();