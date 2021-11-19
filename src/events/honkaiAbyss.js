const fs = require('fs');
const {LocalTime, ZoneOffset, DayOfWeek} = require('@js-joda/core');

/**
 * Reminder of honkai abyss time
 * */
module.exports = {
    name: 'honkaiabyss',
    once: true,
    async execute(bot)
    {
        let currentTime, currentDay

        //get channel

        function notification()
        {

            currentDay = DayOfWeek.now(ZoneOffset.UTC)

            //First Rotation
            if (currentDay.value() === 1 && isStart()) //Mon PST - Mon UTC
            {
                //TODO send
            }
            else if (currentDay.value() === 4 && !isStart()) // Wed PST - Thu UTC
            {
                //TODO send
            }

            //Second Rotation
            if (currentDay.value() === 5 && isStart())  //Fri PST - Fri UTC
            {
                //TODO send
            }
            else if (currentDay.value() === 1 && !isStart())    //Sun PST - Mon UTC
            {
                //TODO send 
            }

            //do nothing if else

        }


        function isStart()
        {
            currentTime = LocalTime.now(ZoneOffset.UTC)

            if (currentTime === 20) //8PM UTC - 12 PM PST
            {
                return true;
            }
            else if (currentTime === 3) //3AM UTC - 7PM PST
            {
                return false;
            }
        }
    }
}