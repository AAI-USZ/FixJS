function () {
      		
      		if (statusCode === 503) {
        		return callback("unavailable", null);
      		}
          else if(statusCode == 401){
            return callback("unauthorized", null);
          }
          else if(statusCode == 500){
            return callback("internal_error", null);
          }
      		else if (statusCode !== 200) {
        		return callback("invalid_request", null);
      		}

      		var data = JSON.parse(buf);

      		callback(null, data);
    	}