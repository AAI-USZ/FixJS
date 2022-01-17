function () {
      		
      		if (statusCode === 503) {
        		console.log('GCM service is unavailable');
        		return callback(statusCode, null);
      		}
      		else if (statusCode !== 200) {
        		console.log('Invalid request: ' + statusCode);
        		return callback(statusCode, null);
      		}

      		var data = JSON.parse(buf);

      		if (registrationIds.length === 1) {
        		if(data.results[0].message_id)
          			result.messageId = data.results[0].message_id;
        		else if(data.results[0].error)
          			result.errorCode = data.results[0].error;
        		else if(data.results[0].registration_id)
          			result.canonicalRegistrationId = data.results[0].registration_id;
        		callback(null, result);
     		}
      		else callback(null, data);
    	}