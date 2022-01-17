function(requestId, errorCode, content, charset)
    {
        this._agentWrapper._fileContentReceived(requestId, errorCode, content, charset);
    }