function (data) {
        	if (data.indexOf('Error=') === 0) {
                result.errorCode = data.substring(6).trim();
                callback(result);
            }
            else if (data.indexOf('id=') === 0) {
                result.messageId = data.substring(3).trim();
                callback(result);
            }
            else callback();

    	}