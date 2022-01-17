function()
    {
        var savedSnippets = this._snippetsSetting.get();
        for (var i = 0; i < savedSnippets.length; ++i)
            this._snippetAdded(WebInspector.Snippet.fromObject(savedSnippets[i]));
    }