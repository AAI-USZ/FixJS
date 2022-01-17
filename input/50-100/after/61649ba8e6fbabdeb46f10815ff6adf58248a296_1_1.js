function(script)
    {
        var uiSourceCode = new WebInspector.JavaScriptSource(script.sourceURL, null, script, this._snippetScriptMapping, false);
        uiSourceCode.isSnippetEvaluation = true;
        this._uiSourceCodeForScriptId[script.scriptId] = uiSourceCode;
        this._scriptForUISourceCode.put(uiSourceCode, script);
        script.setSourceMapping(this._snippetScriptMapping);
    }