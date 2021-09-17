module.exports = {
    name: 'interactionCreate',
    async execute(interaction, bot) {
        const command = bot.commands.get(interaction.commandName);

        if (command)
        {
            try
            {
                await command.execute(interaction);
            }
            catch (error)
            {
                console.error(error);
                await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
            }
        }
    }


}