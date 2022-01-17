function(file, start, end, callback)
    {
        this._agentWrapper.requestFileContent(file.url, start, end, callback);
    }