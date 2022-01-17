function (url, replace) {
        var urlIsString = typeof url === 'string',
            currentPath, root;

        // Perform same-origin check on the specified URL.
        if (urlIsString && !this._hasSameOrigin(url)) {
            Y.error('Security error: The new URL must be of the same origin as the current URL.');
            return this;
        }

        // Joins the `url` with the `root`.
        urlIsString && (url = this._joinURL(url));

        // Force _ready to true to ensure that the history change is handled
        // even if _save is called before the `ready` event fires.
        this._ready = true;

        if (this._html5) {
            this._history[replace ? 'replace' : 'add'](null, {url: url});
        } else {
            currentPath = Y.getLocation().pathname;
            root        = this.get('root');

            // Determine if the `root` already exists in the current location's
            // `pathname`, and if it does then we can exclude it from the
            // hash-based path. No need to duplicate the info in the URL.
            if (root === currentPath || root === this._getPathRoot()) {
                url = this.removeRoot(url);
            }

            // The `hashchange` event only fires when the new hash is actually
            // different. This makes sure we'll always dequeue and dispatch
            // _all_ router instances, mimicking the HTML5 behavior.
            if (url === HistoryHash.getHash()) {
                Y.Router.dispatch();
            } else {
                HistoryHash[replace ? 'replaceHash' : 'setHash'](url);
            }
        }

        return this;
    }