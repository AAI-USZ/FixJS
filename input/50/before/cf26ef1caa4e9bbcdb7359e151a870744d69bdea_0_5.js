function(requestId, errorCode, content)
    {
        this._agentWrapper._fileContentReceived(requestId, errorCode, content);
    }