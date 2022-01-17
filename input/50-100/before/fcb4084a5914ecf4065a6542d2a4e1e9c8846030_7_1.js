function()
{
    var scriptMapping = new WebInspector.DebuggerScriptMapping();
    var providers = scriptMapping.uiSourceCodeProviders();
    providers = providers.concat(new WebInspector.StylesUISourceCodeProvider());
    WebInspector.CompositeUISourceCodeProvider.call(this, providers);
    
    new WebInspector.PresentationConsoleMessageHelper(this);
}