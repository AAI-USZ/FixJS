function (config) {
        var bookmarkedState = win.history.state;

        // Treat empty state objects as `null` so they're not processed further.
        if (Y.Object.isEmpty(bookmarkedState)) {
            bookmarkedState = null;
        }

        config || (config = {});

        // If both the initial state and the bookmarked state are objects, merge
        // them (bookmarked state wins).
        if (config.initialState
                && Lang.type(config.initialState) === 'object'
                && Lang.type(bookmarkedState) === 'object') {

            this._initialState = Y.merge(config.initialState, bookmarkedState);
        } else {
            // Otherwise, the bookmarked state always wins if there is one. If
            // there isn't a bookmarked state, history-base will take care of
            // falling back to config.initialState or null.
            this._initialState = bookmarkedState;
        }

        Y.on('popstate', this._onPopState, win, this);

        HistoryHTML5.superclass._init.apply(this, arguments);
    }