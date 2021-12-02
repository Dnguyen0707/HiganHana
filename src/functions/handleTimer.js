function RunIt(func, delay)
{
    if (delay === undefined)
    {
        delay = 1000*60 //1 min to avoid
    }

    //get stuff
    this.func = func;
    var times = -1;
    var timeCount = 0;
    var ticks = (delay/10)|0;
    var count = 0;
    RunIt.instances = [];
    RunIt.instance.push(this.func);

    this.tick = function()
    {
        if (count >= ticks)
        {
            eval(this.func);
            count = 0;
            if (times > -1)
            {
                timeCount++;
                if (timeCount >= times)
                {
                    this.stop();
                }
            }
        }
        count++;
    }

    this.stop = function()
    {
        var index = RunIt.instance.indexOf(this)
        RunIt.instance.splice(index, 1);
    }
}



RunIt.ontick = function ()
{
    for(var i in RunIt.instances)
    {
        RunIt.instances[i].tick();
    }
}

setInterval(RunIt.ontick, 10);

module.exports = RunIt;