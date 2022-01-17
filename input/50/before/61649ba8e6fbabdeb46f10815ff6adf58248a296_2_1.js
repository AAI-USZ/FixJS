function(uiSourceCode)
    {
        if (!uiSourceCode.url || uiSourceCode.isSnippetEvaluation) {
            // Anonymous sources and snippets evaluations are shown only when stepping.
            return;
        }

        this._addUISourceCode(uiSourceCode);
    }