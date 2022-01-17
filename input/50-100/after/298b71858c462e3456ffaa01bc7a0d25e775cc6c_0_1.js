function(responseError) {
	var originalWrapped = this.constructor.parent._wrapErrorResponse(responseError);
	if (responseError && responseError.responseText) {
		var errorObject;
		try {
			errorObject = $.parseJSON(responseError.responseText);
		} catch(e) {}
		return errorObject || originWrapped;
	}
	return originalWrapped;
}