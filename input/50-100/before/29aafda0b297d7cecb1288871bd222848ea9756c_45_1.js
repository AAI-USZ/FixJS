function getBrowserDocument()
{
    // TODO: this function is called very frequently, worth optimizing
    return Firebug.chrome.inDetachedScope ? Firebug.chrome.originalBrowser.ownerDocument : top.document;
}