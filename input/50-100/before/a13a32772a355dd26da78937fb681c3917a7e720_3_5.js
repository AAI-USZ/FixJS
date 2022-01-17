function(snippetJavaScriptSource)
    {
        var script = this._scriptForUISourceCode.get(snippetJavaScriptSource);
        if (!script)
            return;

        delete this._uiSourceCodeForScriptId[script.scriptId];
        this._scriptForUISourceCode.remove(snippetJavaScriptSource);

        this._createUISourceCodeForScript(script);
    }