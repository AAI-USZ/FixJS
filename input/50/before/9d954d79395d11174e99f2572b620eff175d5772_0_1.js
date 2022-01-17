function clearHistory()
        {
            WebInspector.Resource._clearResourceHistory(this);
            this.history = [];
            callback();
        }