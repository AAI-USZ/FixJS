function()
{
    function filterOutAnonymous(uiSourceCode)
    {
        return !!uiSourceCode.url;
    }

    var uiSourceCodes = WebInspector.panels.scripts._uiSourceCodeProvider.uiSourceCodes();
    return uiSourceCodes.filter(filterOutAnonymous);
}