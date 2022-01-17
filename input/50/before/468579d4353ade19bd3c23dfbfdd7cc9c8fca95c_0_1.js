function(data) {
            	$("#build-output").empty();
            	readerHandler(data, projectCode, testType);
            	if(callSuccessEvent != undefined && !isBlank(callSuccessEvent)) {
            		successEvent(pageUrl, data);
            	}
            }