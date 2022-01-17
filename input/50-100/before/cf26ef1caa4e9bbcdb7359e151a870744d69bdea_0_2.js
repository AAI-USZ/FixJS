function(url, start, end, callback)
    {
        var store = this._pendingFileContentRequests;
        FileSystemAgent.requestFileContent(url, start, end, requestAccepted);

        function requestAccepted(error, requestId)
        {
            if (!error)
                store[requestId] = callback;
        }
    }