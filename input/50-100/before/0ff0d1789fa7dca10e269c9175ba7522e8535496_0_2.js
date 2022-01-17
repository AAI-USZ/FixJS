function failureTotal(request) {
        var aData = _dataByWorkflow[request];
        return (_get(aData, "status.failure.create", 0) + 
                _get(aData, "status.failure.submit", 0) + 
                _get(aData, "status.failure.exception", 0));
    }