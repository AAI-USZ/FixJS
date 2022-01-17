function(rslt){
	logMsg(resourceActionInfo + " Responded", rslt.requestId);
 	if(!validateServerResponse(rslt)){
		logMsg(resourceActionInfo + " Failed to validate the server response - " +  rslt['errorMsg']);
		rslt['serverSideFail'] = true;
	}	
	successCallback(rslt);
  }