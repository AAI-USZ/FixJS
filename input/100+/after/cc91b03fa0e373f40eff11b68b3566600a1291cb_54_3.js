function(styleSheet, ownerDocument)
{
    // ownerDocument is an optional hint for performance
    if (FBTrace.DBG_CSS)
        FBTrace.sysout("getInstanceForStyleSheet href:" + styleSheet.href + " mediaText:" +
            styleSheet.media.mediaText + " path to ownerNode" +
            (styleSheet.ownerNode && Xpath.getElementXPath(styleSheet.ownerNode)), ownerDocument);

    ownerDocument = ownerDocument || Css.getDocumentForStyleSheet(styleSheet);
    if (!ownerDocument)
        return;

    var ret = 0,
        styleSheets = ownerDocument.styleSheets,
        href = styleSheet.href;

    for (var i = 0; i < styleSheets.length; i++)
    {
        var curSheet = styleSheets[i];

        if (FBTrace.DBG_CSS)
        {
            FBTrace.sysout("getInstanceForStyleSheet: compare href " + i +
                " " + curSheet.href + " " + curSheet.media.mediaText + " " +
                (curSheet.ownerNode && Xpath.getElementXPath(curSheet.ownerNode)));
        }

        if (Css.shouldIgnoreSheet(curSheet))
            break;

        if (curSheet == styleSheet)
            break;

        if (curSheet.href == href)
            ret++;
    }
    return ret;
}