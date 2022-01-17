function submittedTotal(request) {
        if (typeof(request) == "string") {
            var aData = _dataByWorkflow[request];
        } else {
            var aData = request;
        }
        return (_get(aData, "status.submit.first", 0) + 
                _get(aData, "status.submit.retry", 0));
    }