function(self, msgObj, callback) {
	"use strict";
	
	// BEGIN OF POLITO MODIFICATIONS
	var valError = validation.checkSchema(msgObj);
	if(valError === false) { // validation error is false, so validation is ok
		session_common.debug('DEBUG','[VALIDATION] Received recognized packet ' + JSON.stringify(msgObj));
	} else if (valError === true) {
		// for debug purposes, we only print a message about unrecognized packet
		// in the final version we should throw an error
		// Currently there is no a formal list of allowed packages and throw errors
		// would prevent the PZH from working
		session_common.debug('INFO','[VALIDATION] Received unrecognized packet ' + JSON.stringify(msgObj));
	} else if (valError === 'failed') {
		session_common.debug('ERROR','[VALIDATION] failed');
	} else {
		session_common.debug('ERROR','[VALIDATION] Invalid response ' + valError);
	}
	callback.call(self, msgObj);
}