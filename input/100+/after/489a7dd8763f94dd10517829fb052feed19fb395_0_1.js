function()
{
    this._uiSourceCodeForScriptId = {};
    this._scriptForUISourceCode = new Map();
    this._snippetJavaScriptSourceForSnippetId = {};
    
    this._snippetStorage = new WebInspector.SnippetStorage("script", "Script snippet #");
    this._lastSnippetEvaluationIndexSetting = WebInspector.settings.createSetting("lastSnippetEvaluationIndex", 0);
    this._snippetScriptMapping = new WebInspector.SnippetScriptMapping(this);
    
    this._loadSnippets();
}