function(rawLocation)
    {
        var uiSourceCode = this._uiSourceCodeForScriptId[rawLocation.scriptId];
        if (uiSourceCode.isSnippet) {
            var uiLineNumber = rawLocation.lineNumber - WebInspector.ScriptSnippetModel.evaluatedSnippetExtraLinesCount;
            return new WebInspector.UILocation(uiSourceCode, uiLineNumber, rawLocation.columnNumber || 0);
        }

        return new WebInspector.UILocation(uiSourceCode, rawLocation.lineNumber, rawLocation.columnNumber || 0);
    }