function(event)
    {
        if (!this._entry.isDirectory)
            return;

        var contextMenu = new WebInspector.ContextMenu();
        contextMenu.appendItem(WebInspector.UIString("Refresh"), this.refresh.bind(this));
        contextMenu.show(event);
    }