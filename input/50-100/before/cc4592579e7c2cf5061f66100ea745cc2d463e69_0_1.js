function()
    {
        if (!this._view) {
            if (this._entry.isDirectory)
                this._view = new WebInspector.DirectoryContentView();
            else
                return;
        }
        this._fileSystemView.showView(this._view);
        this.refresh();
    }