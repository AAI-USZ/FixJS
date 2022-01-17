function(url, readAsText, start, end, charset, callback)
    {
        var store = this._pendingFileContentRequests;
        FileSystemAgent.requestFileContent(url, readAsText, start, end, charset, requestAccepted);

        function requestAccepted(error, requestId)
        {
            if (!error)
                store[requestId] = callback || function() {};
        }
    }