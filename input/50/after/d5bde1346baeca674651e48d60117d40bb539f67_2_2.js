function(event)
    {
        var uiSourceCode = /** @type {WebInspector.UISourceCode} */ event.data;
        this._editorContainer.removeUISourceCode(uiSourceCode);
        this._navigator.removeUISourceCode(uiSourceCode);
        this._removeSourceFrame(uiSourceCode);
    }