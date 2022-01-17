function(errorValue) {
	if (errorValue.type && errorValue.type === 'exn:fail:read') {
	    return new Error(errorValue.message);
	} else if (errorValue.type && errorValue.type === 'moby-failure') {
	    var domMessage = this._convertDomSexpr(errorValue['dom-message']);
            var structuredError = errorValue['structured-error'];
	    return new ErrorWithDomMessage(domMessage, structuredError);
	}
	return new Error(errorValue + '');
    }