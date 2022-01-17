function(file, readAsText, start, end, charset, callback)
    {
        this._agentWrapper.requestFileContent(file.url, readAsText, start, end, charset, callback);
    }