function(transportError) {
	return {
		"result": "error",
		"errorCode": "connection_failure",
		"errorMessage": "",
		"transportError": transportError
	};
}