function(uiSourceCode, event)
    {
        if (!uiSourceCode.isSnippet)
            return;
        var snippetJavaScriptSource = /** @type {WebInspector.SnippetJavaScriptSource} */ uiSourceCode;
        WebInspector.scriptSnippetModel.deleteScriptSnippet(snippetJavaScriptSource);
    }