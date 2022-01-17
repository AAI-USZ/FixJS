function()
    {
        if (!this._view) {
            if (this._entry.isDirectory)
                this._view = new WebInspector.DirectoryContentView();
            else {
                var file = /** @type {WebInspector.FileSystemModel.File} */ this._entry;
                this._view = new WebInspector.FileContentView(file);
            }
        }
        this._fileSystemView.showView(this._view);
        this.refresh();
    }