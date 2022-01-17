function()
{
    if (saveShowStackTrace)
    {
        Firebug.showStackTrace = saveShowStackTrace;
        saveShowStackTrace = null;
    }
}