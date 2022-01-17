function getBrowserDocument()
{
    // TODO: this function is called very frequently, worth optimizing
    try
    {
        var chrome = Firebug.chrome;
        return chrome.inDetachedScope ? chrome.originalBrowser.ownerDocument : top.document;
    }
    catch (e)
    {
        if (FBTrace.DBG_ERRORS)
            FBTrace.sysout("firefox.getBrowserDocument; EXCEPTION " + e, e);
    }
}