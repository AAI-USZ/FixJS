function (url) {
        if (!this._hasSameOrigin(url)) {
            return false;
        }

        url = this.removeQuery(this.removeRoot(url));

        return !!this.match(url).length;
    }