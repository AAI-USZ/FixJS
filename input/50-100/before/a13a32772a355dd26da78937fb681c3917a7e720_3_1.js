function(snippetJavaScriptSource)
    {
        var snippet = this._snippetStorage.snippetForId(snippetJavaScriptSource.snippetId);
        this._snippetStorage.deleteSnippet(snippet);
        this._releaseSnippetScript(snippetJavaScriptSource);
        delete this._snippetJavaScriptSourceForSnippetId[snippet.id];
        this._snippetScriptMapping._fireUISourceCodeRemoved(snippetJavaScriptSource);
    }