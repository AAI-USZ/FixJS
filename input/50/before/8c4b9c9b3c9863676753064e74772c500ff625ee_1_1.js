function() {
        var files = wrench.readdirSyncRecursive(this.root);

        this._filePaths = files.filter(this._filterFile, this);
    }