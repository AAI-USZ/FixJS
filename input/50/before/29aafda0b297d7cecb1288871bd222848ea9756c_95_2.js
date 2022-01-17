function()
{
    if (saveShowStackTrace)
    {
        Firebug.showStackTrace = saveShowStackTrace;
        delete saveShowStackTrace;
    }
}