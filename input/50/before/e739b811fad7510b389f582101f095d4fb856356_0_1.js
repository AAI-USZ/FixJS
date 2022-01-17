function(event)
    {
        var top = event.pageY + this._dragOffset
        this._setSplitterPosition(top);
        event.preventDefault();
        this._refresh();
    }