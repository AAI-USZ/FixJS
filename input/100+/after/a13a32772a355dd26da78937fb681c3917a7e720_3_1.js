function(script)
    {
        var snippetId = this._snippetIdForSourceURL(script.sourceURL);
        var snippetJavaScriptSource = this._snippetJavaScriptSourceForSnippetId[snippetId];
        
        if (!snippetJavaScriptSource || this._evaluationSourceURL(snippetJavaScriptSource) !== script.sourceURL) {
            this._createUISourceCodeForScript(script);
            return;
        }
        
        console.assert(!this._scriptForUISourceCode.get(snippetJavaScriptSource));
        this._uiSourceCodeForScriptId[script.scriptId] = snippetJavaScriptSource;
        this._scriptForUISourceCode.put(snippetJavaScriptSource, script);
        script.setSourceMapping(this._snippetScriptMapping);
    }