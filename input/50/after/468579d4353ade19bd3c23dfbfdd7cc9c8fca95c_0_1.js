function(data) {
            	$("#build-output").empty();
            	readerHandler(data, projectCode, testType, pageUrl);
            	if(callSuccessEvent != undefined && !isBlank(callSuccessEvent)) {
            		successEvent(pageUrl, data);
            	}
            }