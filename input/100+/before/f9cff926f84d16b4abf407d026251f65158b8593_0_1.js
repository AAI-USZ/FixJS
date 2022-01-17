function (url, replace) {
        var urlIsString = typeof url === 'string',
            currentPath;

        // Perform same-origin check on the specified URL.
        if (urlIsString && !this._hasSameOrigin(url)) {
            Y.error('Security error: The new URL must be of the same origin as the current URL.');
            return this;
        }

        urlIsString && (url = this._joinURL(url));

        // Force _ready to true to ensure that the history change is handled
        // even if _save is called before the `ready` event fires.
        this._ready = true;

        if (this._html5) {
            this._history[replace ? 'replace' : 'add'](null, {url: url});
        } else {
            currentPath = Y.getLocation().pathname;

            // Remove the path segments from the hash-based path that already
            // exist in the page's `location.pathname`. This leads to better
            // URLs by not duplicating the `root` path segment(s).
            if (currentPath.length > 1 && url.indexOf(currentPath) === 0) {
                url = url.substring(currentPath.length);
                url.charAt(0) === '/' || (url = '/' + url);
            }

            // The `hashchange` event only fires when the new hash is actually
            // different. This makes sure we'll always dequeue and dispatch,
            // mimicking the HTML5 behavior.
            if (url === HistoryHash.getHash()) {
                this._dispatch(this._getPath(), this._getURL());
            } else {
                HistoryHash[replace ? 'replaceHash' : 'setHash'](url);
            }
        }

        return this;
    }