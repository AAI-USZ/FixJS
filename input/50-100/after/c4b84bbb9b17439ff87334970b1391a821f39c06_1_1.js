function(callback)
    {
        function revert(content)
        {
            this.setContent(content, true, clearHistory.bind(this));
        }

        function clearHistory()
        {
            WebInspector.Resource._clearResourceHistory(this);
            this.history = [];
            callback();
        }

        this.requestContent(revert.bind(this));
    }