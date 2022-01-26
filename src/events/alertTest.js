const fs = require('fs');
const {LocalTime, ZoneOffset, LocalDateTime, DayOfWeek} = require('@js-joda/core');
const {Worker} = require('worker_threads')

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
        let currentTime = LocalTime.now()
        let currentDay = LocalDateTime.now()
        let currentDayOfWeek = currentDay.dayOfWeek()


        function notification()
        {

            //Start and end
            if (timeCheck(DayOfWeek.SUNDAY, true))
            {
                channel.send("This is a test")
            }
        }

        //check for start and end time
        function timeCheck(targetDay, start)
        {
            // start Time
            if(start === true)
            {
                if (currentTime.hour() === 1 && currentTime.minute() === 3 &&
                    currentDayOfWeek.equals(targetDay))
                {
                    return true;
                }
            }
            return false;
        }

        //run
        function runService(workerData)
        {
            return new Promise((resolve, reject) => {
                const worker = new Worker(
                    './worker.js', {workerData});
                worker.on('message', resolve)
                worker.on('error', reject)
                worker.on('exit', (code) => {
                    if (code !== 0)
                    {
                        reject(new Error(
                            `Stopped working with code: ${code}`))
                    }
                })
            })
        }
        async function run()
        {
            await runService(notification)
        }
        run().catch(err => console.error(err))
    }
}

//TODO figure out worker thread