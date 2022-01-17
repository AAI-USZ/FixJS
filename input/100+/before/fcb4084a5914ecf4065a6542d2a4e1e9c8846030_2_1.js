function()
{
    this._mappings = [];
  
    this._resourceMapping = new WebInspector.ResourceScriptMapping();
    this._mappings.push(this._resourceMapping);
    this._compilerMapping = new WebInspector.CompilerScriptMapping();
    this._mappings.push(this._compilerMapping);
    this._snippetMapping = WebInspector.scriptSnippetModel.scriptMapping;
    this._mappings.push(this._snippetMapping);

    WebInspector.debuggerModel.addEventListener(WebInspector.DebuggerModel.Events.ParsedScriptSource, this._parsedScriptSource, this);
    WebInspector.debuggerModel.addEventListener(WebInspector.DebuggerModel.Events.FailedToParseScriptSource, this._parsedScriptSource, this);
    WebInspector.debuggerModel.addEventListener(WebInspector.DebuggerModel.Events.GlobalObjectCleared, this._debuggerReset, this);
}