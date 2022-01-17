function()
{
    function filterOutAnonymous(uiSourceCode)
    {
        return !!uiSourceCode.url;
    }

    var uiSourceCodes = WebInspector.workspace.uiSourceCodes();
    return uiSourceCodes.filter(filterOutAnonymous);
}