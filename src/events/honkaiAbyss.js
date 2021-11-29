const fs = require('fs');
const {LocalTime, ZoneOffset, LocalDateTime, DayOfWeek} = require('@js-joda/core');

/**
 * Reminder of honkai abyss time
 * */
module.exports = {
    name: 'honkaiabyss',
    once: true,
    async execute(bot)
    {
        //get channel
        let channel = bot.channels.cache.get('813889351104331826')

        // get current day/time stuff
        let currentTime = LocalTime.now(ZoneOffset.UTC)
        let currentDay = LocalDateTime.now(ZoneOffset.UTC)
        let currentDayOfWeek = currentDay.dayOfWeek()


        function notification()
        {

            //Start and end
            if (timeCheck(DayOfWeek.MONDAY, true) || timeCheck(DayOfWeek.FRIDAY, true))
            {
                channel.send("Abyss have started! go in and beat shit up")
            }
            else if (timeCheck(DayOfWeek.THURSDAY, false) || timeCheck(DayOfWeek.MONDAY, false))
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




        //check for start and end time
        function timeCheck(targetDay, start) //
        {
            // start Time
            if(start === true)
            {
                if (currentTime.hour() === 22 &&
                    currentDayOfWeek.equals(targetDay))  //12 PM PST - 20 UTC, TODO change later
                {
                    return true;
                }
            }
            // end time
            else
            {
                if (currentTime.hour() === 3 &&
                    currentDayOfWeek.equals(targetDay))   //7 PM PST
                {
                    return true;
                }
            }
            return false;
        }

        function beforeEnd()
        {
            if (currentDayOfWeek.equals(DayOfWeek.MONDAY) || currentDayOfWeek.equals(DayOfWeek.THURSDAY))
            {
                if (currentTime.hour() === 2 && currentTime.minute() === 45)
                {
                    return true;
                }
            }
            return false;
        }
    }
}