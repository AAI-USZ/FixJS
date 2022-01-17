function()
{
    this._uiSourceCodeForScriptId = {};
    this._scriptForUISourceCode = new Map();
    this._snippetJavaScriptSourceForSnippetId = {};
    
    this._snippetStorage = new WebInspector.SnippetStorage("script", "Script snippet #");
    this._lastSnippetEvaluationIndexSetting = WebInspector.settings.createSetting("lastSnippetEvaluationIndex", 0);
    this._snippetScriptMapping = new WebInspector.SnippetScriptMapping(this);
    
    var snippets = this._snippetStorage.snippets;
    for (var i = 0; i < snippets.length; ++i)
        this._addScriptSnippet(snippets[i]);
}