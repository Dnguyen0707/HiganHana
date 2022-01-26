//setting status and stuff
const fs = require('fs');
const {LocalTime, ZoneOffset} = require('@js-joda/core');


module.exports = {
    name: 'ready',
    once: false,
    async execute(bot)
    {
        /*----------------------------------------------------------------------------------------------------*/

        let jsonSetting;
        let setting;

        //reading setting
        try {
            jsonSetting = fs.readFileSync('./src/setting.json')
            setting = JSON.parse(jsonSetting)
            console.log("Current avatar:", setting.currentAvatar)
        } catch (err) {
            console.log(err)
            return
        }


        let currentTime;
        function avatarSwitch()
        {
            //getting current time
            currentTime = LocalTime.now(ZoneOffset.UTC);

            //switching to Tsukika
            if (currentTime.hour() >= 6 && currentTime.hour() < 14)   //from 11PM to 7AM
            {
                //check setting.json so discord doesn't slap my ass with errors
                if (setting.currentAvatar === "Hinoka")
                {
                    //change to tsukika
                    bot.user.setAvatar(fs.readFileSync('./resources/avatar/tsukika.png'))
                        .then(bot => console.log('Changed to Tsukika'))
                        .catch(console.error);
                    bot.user.setUsername('Tsukika');

                    //update json
                    setting.currentAvatar = "Tsukika";
                    fs.writeFileSync('./src/setting.json', JSON.stringify(setting));

                    setActivity()
                }
            }
            //switching to Hinoka, from 7AM to 11PM
            else
            {
                if (setting.currentAvatar === "Tsukika")
                {
                    //change to tsukika
                    bot.user.setAvatar(fs.readFileSync('./resources/avatar/hinoka.png'))
                        .then(bot => console.log('Changed to Hinoka'))
                        .catch(console.error);
                    bot.user.setUsername('Hinoka');

                    //update json
                    setting.currentAvatar = "Hinoka";
                    fs.writeFileSync('./src/setting.json', JSON.stringify(setting));

                    setActivity()
                }
            }
        }
        //setInterval(avatarSwitch, 1000);   //check every 1 second


        function setActivity()
        {
            //set presence
            bot.user.setActivity('for dem Slash Commands', {type: 'LISTENING'});
        }



        /*----------------------------------------------------------------------------------------------------*/

    }


};




