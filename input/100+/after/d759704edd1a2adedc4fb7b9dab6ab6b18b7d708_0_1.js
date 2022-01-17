function (handlers) {
	this.methods = [];
	this.httpMethods = [];
	this.map = {};

	var multiplePostCandidates = false;

	for (var method in handlers) {
		this.methods.push(method);

		var httpMethod = this.logicToHttpMap[method];
		if (httpMethod == null) {
			throw new Error('Unknown method "' + method + '"');
		}

		var existingMethod = this.map[httpMethod];
		if (existingMethod == null) {
			this.map[httpMethod] = method;
			this.httpMethods.push(httpMethod);
		}
		else if (httpMethod == 'POST') {
			multiplePostCandidates = true;
			if (existingMethod != this.logicDefaultForPost) {
				this.map[httpMethod] = method;
			}
		}
		else {
			throw new Error('Unambigous mapping');
		}
	}
	if (multiplePostCandidates && this.map.POST != this.logicDefaultForPost) {
		// ensure no direct mapping for POST provided
		// if there is no default candidate and there are more than one non-default
		delete this.map.POST;
	}
}