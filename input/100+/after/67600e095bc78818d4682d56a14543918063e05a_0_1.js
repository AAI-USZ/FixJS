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

        var url = /** @type {String} */ message.url;
        var uiSourceCode = WebInspector.workspace.uiSourceCodeForURL(url);
        if (!uiSourceCode) {
            var resource = WebInspector.resourceTreeModel.resourceForURL(url);
            if (!resource)
                return this._status.E_NOTFOUND(url);
            return this._status.E_NOTSUPPORTED("Resource is not editable")
        }
        uiSourceCode.setWorkingCopy(message.content);
        if (message.commit)
            uiSourceCode.commitWorkingCopy(callbackWrapper.bind(this));
        else
            callbackWrapper.call(this);
    }