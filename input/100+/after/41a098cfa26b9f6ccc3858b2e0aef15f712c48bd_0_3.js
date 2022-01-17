function(message, registrationId, callback) {
	var body = {}, result = new Result();
	var regs = [];
	body[Constants.JSON_REGISTRATION_IDS] = [registrationId];
	if (message.delayWhileIdle !== undefined) {
		body[Constants.PARAM_DELAY_WHILE_IDLE] = message.delayWhileIdle ? '1' : '0';
	}
	if (message.collapseKey !== undefined) {
		body[Constants.PARAM_COLLAPSE_KEY] = message.collapseKey;
	}
	for (var data in message.data) {
		body[Constants.PARAM_PAYLOAD_PREFIX + data] = message.data[data];
	}

	var requestBody = JSON.stringify(body);

	var post_options = {
      	host: Constants.GCM_SEND_ENDPOINT,
      	port: '443',
      	path: Constants.GCM_SEND_ENDPATH,
      	method: 'POST',
      	headers: {
          	'Content-Type' : 'application/json',
          	'Content-length' : requestBody.length,
          	'Authorization' : 'key=' + this.key
      	}
  	};

  	var post_req = https.request(post_options, function(res) {
      	res.setEncoding('utf-8');
      	var statusCode = res.statusCode;

      	res.on('data', function (data) {
      		data = JSON.parse(data);
      		if (statusCode === 503) {
      			console.log('GCM services is unavailable');
      			callback();
      		}
      		else if (statusCode !== 200) {
      			console.log('Invalid request: ' + statusCode);
      			callback();
      		}
        	if(data.results[0].message_id)
        		result.messageId = data.results[0].message_id;
        	else if(data.results[0].error)
        		result.errorCode = data.results[0].error;
        	else if(data.results[0].registration_id)
        		result.canonicalRegistrationId = data.results[0].registration_id;
      		callback(result);
    	});
  	});

  	post_req.write(requestBody);
  	post_req.end();
}