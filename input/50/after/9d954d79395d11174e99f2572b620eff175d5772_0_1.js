function clearHistory()
        {
            this._clearRevisionHistory();
            this.history = [];
            callback();
        }