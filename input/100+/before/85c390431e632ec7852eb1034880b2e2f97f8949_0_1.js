function(res) {
      	res.setEncoding('utf-8');
      	var statusCode = res.statusCode;

      	res.on('data', function (data) {
      		data = JSON.parse(data);
      		if (statusCode === 503) {
      			console.log('GCM service is unavailable');
      			callback();
      		}
      		else if (statusCode !== 200) {
      			console.log('Invalid request: ' + statusCode);
      			callback();
      		}

      		if (registrationIds.length === 1) {
        		if(data.results[0].message_id)
        			result.messageId = data.results[0].message_id;
        		else if(data.results[0].error)
        			result.errorCode = data.results[0].error;
        		else if(data.results[0].registration_id)
        			result.canonicalRegistrationId = data.results[0].registration_id;
      			callback(result);
      		}
      		else callback(data);
    	});
  	}