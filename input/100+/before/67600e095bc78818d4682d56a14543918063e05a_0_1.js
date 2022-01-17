function(message, port)
    {
        /**
         * @param {?Protocol.Error} error
         */
        function callbackWrapper(error)
        {
            var response = error ? this._status.E_FAILED(error) : this._status.OK();
            this._dispatchCallback(message.requestId, port, response);
        }
        var resource = WebInspector.resourceTreeModel.resourceForURL(message.url);
        if (!resource)
            return this._status.E_NOTFOUND(message.url);
        resource.setContent(message.content, message.commit, callbackWrapper.bind(this));
    }