function failureTotal(request) {
        if (typeof(request) == "string") {
            var aData = _dataByWorkflow[request];
        } else {
            var aData = request;
        }
        return (_get(aData, "status.failure.create", 0) + 
                _get(aData, "status.failure.submit", 0) + 
                _get(aData, "status.failure.exception", 0));
    }