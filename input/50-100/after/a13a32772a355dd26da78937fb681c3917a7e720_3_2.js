function(snippetJavaScriptSource)
    {
        var script = this._scriptForUISourceCode.get(snippetJavaScriptSource);
        if (!script)
            return;
        
        var breakpointLocations = this._removeBreakpoints(snippetJavaScriptSource);
        this._releaseSnippetScript(snippetJavaScriptSource);
        this._restoreBreakpoints(snippetJavaScriptSource, breakpointLocations);
    }