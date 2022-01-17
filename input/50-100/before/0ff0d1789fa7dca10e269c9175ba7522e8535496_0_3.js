function submittedTotal(request) {
        var aData = _dataByWorkflow[request];
        return (_get(aData, "status.submit.first", 0) + 
                _get(aData, "status.submit.retry", 0));
    }