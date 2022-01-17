function updateRequestSummary(doc) {
        var request = doc.workflow;
        var aData = _dataByWorkflow[request];
        
        if (doc.type == "agent_request") {
            _summary.totalJobs += getWMBSJobsTotal(doc);
            _summary.processedEvents += _get(doc, "output_progress.0.events", 0)
            _summary.failure += failureTotal(doc);
            _summary.queued += queuedTotal(doc);
            _summary.success += _get(doc, "status.success", 0);
            _summary.running += _get(doc, "status.submitted.running", 0);
            _summary.pending += _get(doc, "status.submitted.pending", 0);
        } else if (doc.type == "reqmgr_request") {
            _summary.totalEvents += Number(_get(doc, "input_events", 0));
            _summary.length++;
        }
    }