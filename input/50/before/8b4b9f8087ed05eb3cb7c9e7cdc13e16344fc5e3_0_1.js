function (url) {
        if (!this._hasSameOrigin(url)) {
            return false;
        }

        return !!this.match(this.removeRoot(url)).length;
    }