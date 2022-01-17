function (hash) {
        hash || (hash = HistoryHash.getHash());

        // Make sure the `hash` is path-like.
        if (hash && hash.charAt(0) === '/') {
            return (this.get('root') ?
                    this._resolvePath(hash.substring(1)) : hash);
        }

        return '';
    }