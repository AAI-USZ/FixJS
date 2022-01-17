function updateRequest(doc) {
        var request = getDataByWorkflow(doc.workflow);
        if (!request) {
            _length++;
            _dataByWorkflow[doc.workflow] = {};
        }
        var requestWithAgent = getRequestByNameAndAgent(doc.workflow, doc.agent_url);
         
        for (var field in doc) {
            //handles when request is splited in more than one agents
            if (_dataByWorkflow[doc.workflow][field]  && (field == 'sites' || field == 'status')){
                _addJobs(_dataByWorkflow[doc.workflow][field], doc[field])
            } else {
                _dataByWorkflow[doc.workflow][field] = doc[field];
            }
            //for request, agenturl structure
            requestWithAgent[field] = doc[field];
        }
        updateSummary(doc.workflow, _summary);
    }