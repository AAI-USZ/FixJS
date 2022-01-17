function()
    {
        function revert(content)
        {
            this.setContent(content, true, function() {});
            WebInspector.Resource._clearResourceHistory(this);
            this.history = [];
        }
        this.requestContent(revert.bind(this));
    }