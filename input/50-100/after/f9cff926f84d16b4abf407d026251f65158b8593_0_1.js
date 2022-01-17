function (hash) {
        hash || (hash = HistoryHash.getHash());

        // Make sure the `hash` is path-like.
        if (hash && hash.charAt(0) === '/') {
            return this._joinURL(hash);
        }

        return '';
    }