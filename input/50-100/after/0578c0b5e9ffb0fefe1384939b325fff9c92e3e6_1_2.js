function(rslt){
	logMsg(resourceActionInfo + " Responded", rslt.requestId);
 	if(!validateServerResponse(rslt)){
		logMsg(resourceActionInfo + " Failed to validate the server response - " +  rslt['errorMsg']);
		rslt[SERVER_SIDE_FAIL] = true;
	}	
	successCallback(rslt);
  }