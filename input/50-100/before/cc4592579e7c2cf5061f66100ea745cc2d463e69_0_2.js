function()
    {
        if (!this._entry.isDirectory)
            return;
        this._entry.requestDirectoryContent(this._directoryContentReceived.bind(this));
    }