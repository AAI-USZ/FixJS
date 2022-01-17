function () {
        var path = (!this._html5 && this._getHashPath()) ||
                Y.getLocation().pathname;

        return this.removeRoot(path);
    }