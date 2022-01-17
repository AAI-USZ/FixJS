function(line)
    {
        this._clearLineToReveal();
        this._clearLineToScrollTo();
        this._lineToHighlight = line;
        this._innerHighlightLineIfNeeded();
    }