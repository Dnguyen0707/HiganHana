const fs = require('fs');
const {LocalTime, ZoneOffset, LocalDateTime} = require('@js-joda/core');

//TODO change for Sim Battle
module.exports = {
    name: 'honkaisimbattle',
    once: true,
    async execute(bot)
    {
        //get channel
        let channel = bot.channels.cache.get('813889351104331826')

        function notification()
        {

            //Start and end
            if (timeCheck(1, true) || timeCheck(5, true))
            {
                channel.send("Abyss have started! go in and beat shit up")
            }
            else if (timeCheck(4, false) || timeCheck(1, false))
            {
                channel.send("Abyss have ended! If you forgot then um... no need")
            }

            //check for 15 min before it end
            if (beforeEnd())
            {
                channel.send("Abyss is ending in 15 min, start speed running that shit if you haven't done it")
            }
        }
        setInterval(notification, 1000) //check every second

        // let currentTime, currentDay
        let currentTime = LocalTime.now(ZoneOffset.UTC)
        let currentDay = LocalDateTime.now(ZoneOffset.UTC).dayOfWeek().value()


        //check for start and end time
        function timeCheck(targetDay, start) //
        {
            // start Time
            if(start === true)
            {
                if (currentTime.hour() === 15 &&
                    currentDay === targetDay)
                {
                    return true;
                }
            }
            // end time
            else
            {
                if (currentTime.hour() === 3 &&
                    currentDay === targetDay)
                {
                    return true;
                }
            }
        }

        function beforeEnd()
        {
            if (currentDay === 1 || currentDay === 4)
            {
                if (currentTime.hour() === 2 && currentTime.minute() === 45)
                {
                    return true;
                }
            }
        }
    }
}