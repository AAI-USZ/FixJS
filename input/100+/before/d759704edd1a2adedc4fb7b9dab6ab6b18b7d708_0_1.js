function (handlers) {
	this.methods = [];
	this.httpMethods = [];
	this.map = {};
	this.postSubstitutesMap = {};
	var postSubstitutesCount = 0;

	for (var method in handlers) {
		this.methods.push(method);
		var httpMethod = this.logicToHttpMap[method];
		if (httpMethod == null) {
			throw new Error('Unknown method "' + method + '"');
		}
		this.httpMethods.push(httpMethod);
		this.map[method] = method;
		if (httpMethod != 'POST' && this.map[httpMethod] != null) {
			throw new Error('Unambigous mapping');
		}
		this.map[httpMethod] = method;
		if (this.potentialPostSubstitutesMap[method]) {
			this.postSubstitutesMap[method] = true;
			postSubstitutesCount++;
		}
	}
	// ensure POST is mapped to default if present
	if (this.map[this.logicDefaultForPost] != null) {
		this.map.POST = this.logicDefaultForPost;
	}
	else if (postSubstitutesCount > 1) {
		// ensure no direct mapping for POST provided if there are more than one non-default candidate
		delete this.map.POST;
	}
}