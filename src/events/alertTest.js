const fs = require('fs');
const {LocalTime, ZoneOffset, LocalDateTime, DayOfWeek} = require('@js-joda/core');

/**
 * Reminder of honkai abyss time
 * */
module.exports = {
    name: 'honkaiabyss',
    once: false,
    async execute(bot)
    {
        //get channel TODO currently using beta
        let channel = bot.channels.cache.get('810705396389773322')

        // get current day/time stuff
        let currentTime = LocalTime.now(ZoneOffset.UTC)
        let currentDay = LocalDateTime.now(ZoneOffset.UTC)
        let currentDayOfWeek = currentDay.dayOfWeek()


        function notification()
        {

            //Start and end
            if (timeCheck(DayOfWeek.TUESDAY, true))
            {
                channel.send("This is a test")
            }
        }
        setInterval(notification, 1000)


        //check for start and end time
        function timeCheck(targetDay, start)
        {
            // start Time
            if(start === true)
            {
                if (currentTime.hour() === 4 && currentTime.minute() === 40 &&
                    currentDayOfWeek.equals(targetDay))
                {
                    return true;
                }
            }
            return false;
        }
    }
}