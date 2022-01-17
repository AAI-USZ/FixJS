function StartTheTimer()
{
    setTimer('00:'+zeroFill(secs,2)+'/00:20');
    if (secs == maxTime)
    {
        StopTheClock();
    }
    else
    {
        self.status = secs;
        secs = secs + 1;
        timerRunning = true;
        timerID = self.setTimeout("StartTheTimer()", delay);
    }
}