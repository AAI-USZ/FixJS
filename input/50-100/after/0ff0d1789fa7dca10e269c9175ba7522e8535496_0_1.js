function getWMBSJobsTotal(request) {
        if (typeof(request) == "string") {
            var aData = _dataByWorkflow[request];
        } else {
            var aData = request;
        }
        
        return (_get(aData, "status.success", 0) + 
                _get(aData, "status.cooloff", 0) + 
                _get(aData, "status.canceled", 0) +
                failureTotal(request) +
                queuedTotal(request) +
                submittedTotal(request));
    }