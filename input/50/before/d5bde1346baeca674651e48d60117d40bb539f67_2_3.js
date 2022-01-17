function(uiLocation)
    {
        // Some scripts (anonymous and snippets evaluations) are not added to files select by default.
        this._editorContainer.uiSourceCodeAdded(uiLocation.uiSourceCode);
        var sourceFrame = this._showFile(uiLocation.uiSourceCode);
        sourceFrame.revealLine(uiLocation.lineNumber);
        sourceFrame.focus();
    }