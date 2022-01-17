function estimateCompletionTime(request) {
        //TODO need to improve the algo
        // no infomation to calulate the estimate completion time
        var aData = getDataByWorkflow(request);
        var completedJobs = _get(aData, "status.success", 0) + failureTotal(request);
        if (completedJobs == 0) return -1;
        // get running start time.
        var requestStatus = _get(aData, "request_status");
        var lastStatus = requestStatus[requestStatus.length - 1];
        
        //request is done
        if (lastStatus.status !== 'running') return 0;
        
        var totalJobs = getWMBSJobsTotal(request) - _get(aData, "status.canceled", 0);
        // jobCompletion percentage 
        var completionRatio = (completedJobs / totalJobs);
        var queueInjectionRatio = _get(aData, "status.inWMBS",  0) / _get(aData, 'total_jobs', 1);
        var duration = Math.round(Date.now() / 1000) - lastStatus.update_time;
        var timeLeft = Math.round(duration / (completionRatio * queueInjectionRatio));
        
        return timeLeft;
    }