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

      		callback(null, data);
    	}