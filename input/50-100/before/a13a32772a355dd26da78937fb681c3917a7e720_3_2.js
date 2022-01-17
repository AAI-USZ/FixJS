function(snippetJavaScriptSource)
    {
        this._releaseSnippetScript(snippetJavaScriptSource);
        var evaluationIndex = this._lastSnippetEvaluationIndexSetting.get() + 1;
        this._lastSnippetEvaluationIndexSetting.set(evaluationIndex);

        var snippet = this._snippetStorage.snippetForId(snippetJavaScriptSource.snippetId);
        var sourceURL = this._sourceURLForSnippet(snippet, evaluationIndex);
        snippet._lastEvaluationSourceURL = sourceURL;
        var expression = "\n//@ sourceURL=" + sourceURL + "\n" + snippet.content;
        WebInspector.evaluateInConsole(expression, true);
    }