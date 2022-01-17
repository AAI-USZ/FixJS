function updateTime(spy)
{
    if(spy.logRow)
    {
        var timeBox = spy.logRow.getElementsByClassName("spyTime").item(0);
        if (spy.responseTime)
            timeBox.textContent = " " + Str.formatTime(spy.responseTime);
    }
}