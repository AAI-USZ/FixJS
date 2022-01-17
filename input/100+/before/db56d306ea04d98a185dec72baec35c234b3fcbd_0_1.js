function parseDuration(durationString)
{
    try
    {
        var match = durationString.match(/\d+:\d+/g);

        if (match)
        {
            var mins    = match[0].substring(0, match[0].indexOf(':'));
            var seconds = match[0].substring(match[0].indexOf(':')+1);
            return parseInt(mins*60, 10) + parseInt(seconds, 10);
        }
        else
        {
            return 0;
        }
    }
    catch(err)
    {
        throw err;
        return 0;
    }
}