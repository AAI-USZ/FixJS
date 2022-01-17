function() {
        var files = wrench.readdirSyncRecursive(this.options.root);

        this._filePaths = files.filter(this._filterFile, this);
    }