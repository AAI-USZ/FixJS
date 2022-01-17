function getWMBSJobsTotal(request) {
        var aData = _dataByWorkflow[request];
        return (_get(aData, "status.success", 0) + 
                _get(aData, "status.cooloff", 0) + 
                _get(aData, "status.canceled", 0) +
                failureTotal(request) +
                queuedTotal(request) +
                submittedTotal(request));
    }