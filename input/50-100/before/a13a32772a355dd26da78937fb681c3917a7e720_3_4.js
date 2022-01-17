function(uiSourceCode, lineNumber, columnNumber)
    {
        var script = this._scriptForUISourceCode.get(uiSourceCode);
        if (!script)
            return null;

        if (uiSourceCode.isSnippet) {
            var rawLineNumber = lineNumber + WebInspector.ScriptSnippetModel.evaluatedSnippetExtraLinesCount;
            return WebInspector.debuggerModel.createRawLocation(script, rawLineNumber, columnNumber);
        }

        return WebInspector.debuggerModel.createRawLocation(script, lineNumber, columnNumber);
    }