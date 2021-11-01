//setting and stuff
const fs = require('fs');
const {ZoneOffset, LocalDateTime} = require('@js-joda/core');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'honkaiMonthlyYeet',
    once: true,
    async execute(bot)
    {
        let jsonSetting;
        let setting;

        //reading setting
        try {
            jsonSetting = fs.readFileSync('./src/setting.json')
            setting = JSON.parse(jsonSetting)
            console.log("Curret Monthly Yeet: " + setting.monthlyYeet)
        }
        catch (e)
        {
            console.log(e)
            return
        }


        let currentDateTime;
        function monthlyYeet()
        {
            currentDateTime = LocalDateTime.now(ZoneOffset.UTC);


            //if the current day is 1, doesn't matter which month and if the hour is 7am,
            //which is 12AM here. And if setting is on
            if (currentDateTime.dayOfMonth() === 1 && currentDateTime.hour() === 7 &&
                setting.monthlyYeet === true)
            {
                //making an embed
                const embed = new MessageEmbed()
                    .setTitle(currentDateTime.month() + " Yeeting Time")
                    .setColor('#990000')
                    .setDescription("Here it is people, it's time for yeeting. Same as usual, if you been inactive since the " +
                        "beginning of last month, the bye bye yeeting time")
            }
        }
        setInterval(monthlyYeet, 1000); //check every 1 second

    }
}