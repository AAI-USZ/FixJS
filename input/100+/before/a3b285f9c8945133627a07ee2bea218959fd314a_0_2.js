function (exception, requestData) {
    	var separator = "==================================";
    	
    	this.setIcon(Ext.MessageBox.ERROR);
    	
    	this.messageDiv.update(exception.message);
    	this.setTitle(exception.message);
    	
    	var fullDetails = exception.message;
    	
    	if (exception.detail) {
    		fullDetails += "\n\n"+i18n("Details")+"\n"+separator+"\n";
    		fullDetails += exception.detail;
    		
    		this.detailDiv.update(exception.detail);
    	} else {
    		this.detailDiv.update("");
    	}
    	
    	
    	if (exception.exception) {
    		fullDetails += "\n\n"+i18n("Exception")+"\n"+separator+"\n";
    		fullDetails += exception.exception;
    		
    		this.exceptionDetails.setValue(exception.exception);
    	} else {
    		this.exceptionDetails.setValue("No information available");
    	}
    	
    	if (exception.backtrace) {
    		fullDetails += "\n\n"+i18n("Backtrace")+"\n"+separator+"\n";
    		fullDetails += exception.exception;
    		
    		this.backtraceDetails.setValue(nl2br(exception.backtrace));
    	} else {
    		this.backtraceDetails.setValue("No backtrace available");
    	}
    	
    	if (requestData.request) {
    		fullDetails += "\n\n"+i18n("Request")+"\n"+separator+"\n";
    		fullDetails += requestData.request;
    		
    		this.requestDetails.setValue(nl2br(requestData.request));
    	} else {
    		this.requestDetails.setValue("No server request information available");
    	}
    	
    	if (requestData.response) {
    		fullDetails += "\n\n"+i18n("Response")+"\n"+separator+"\n";
    		fullDetails += requestData.response;
    		
    		this.responseDetails.setValue(nl2br(requestData.response));
    	} else {
    		this.responseDetails.setValue("No server response information available");
    	}
    	
    	fullDetails += "\n\n"+i18n("Server Configuration")+"\n"+separator+"\n";
    	
    	for (var j in window.parameters) {
    		fullDetails += j+": " + window.parameters[j]+"\n"; 
    	}
    	
    	this.fullReport.setValue(fullDetails);
    	
    	this.show();
    	this.topContainer.layout.setActiveItem(0);
    	this.doLayout();
    }