function updateRequest(doc) {

        var request = getDataByWorkflow(doc.workflow);
        if (!request) {
            _length++;
            _dataByWorkflow[doc.workflow] = {};
        }
        
        updateRequestSummary(doc);
        
        var requestWithAgent = getRequestByNameAndAgent(doc.workflow, doc.agent_url);
         
        for (var field in doc) {
            //handles when request is splited in more than one agents
            if (_dataByWorkflow[doc.workflow][field] && 
                (field == 'sites' || field == 'status')){
                _addJobs(_dataByWorkflow[doc.workflow][field], doc[field])
            } else if (_dataByWorkflow[doc.workflow][field] && field == 'output_progress') {
                var outProgress = _dataByWorkflow[doc.workflow].output_progress;
                for (var index in outProgress){
                    for (var prop in doc[field][index]) {
                        outProgress[index][prop] += doc[field][index][prop];
                        //TODO: need combine dataset separtely
                    }
                }
            } else {
                _dataByWorkflow[doc.workflow][field] = doc[field];
            }
            //for request, agenturl structure
            requestWithAgent[field] = doc[field];
        }
    }