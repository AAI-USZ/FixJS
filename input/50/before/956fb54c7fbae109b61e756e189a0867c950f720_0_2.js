function(seconds)
{
    var d = new Date();
    seconds = d.getTime() / 1000 - seconds;
    return Helpers.secondsToString(seconds);
}