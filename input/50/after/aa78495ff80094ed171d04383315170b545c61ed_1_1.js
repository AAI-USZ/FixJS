function(line)
    {
        this._clearLineToReveal();
        this._clearLineToScrollTo();
        this._lineToHighlight = line;
        this._innerHighlightLineIfNeeded();
        this._textEditor.setSelection(WebInspector.TextRange.createFromLocation(line, 0));
    }