function()
    {
        if (!this._entry.isDirectory) {
            if (this._view && this._view === this._fileSystemView.visibleView) {
                var fileContentView = /** @type {WebInspector.FileContentView} */ this._view;
                fileContentView.refresh();
            }
        } else
            this._entry.requestDirectoryContent(this._directoryContentReceived.bind(this));
    }