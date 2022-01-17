function queuedTotal(request) {
        if (typeof(request) == "string") {
            var aData = _dataByWorkflow[request];
        } else {
            var aData = request;
        }
        return (_get(aData, "status.queued.first", 0) + 
                _get(aData, "status.queued.retry", 0));
    }