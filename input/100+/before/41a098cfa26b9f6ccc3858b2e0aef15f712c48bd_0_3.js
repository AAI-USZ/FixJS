function(message, registrationId, callback) {
	var body = {}, result = new Result();
	body[Constants.PARAM_REGISTRATION_ID] = registrationId;
	if (message.delayWhileIdle !== undefined) {
		body[Constants.PARAM_DELAY_WHILE_IDLE] = message.delayWhileIdle ? '1' : '0';
	}
	if (message.collapseKey !== undefined) {
		body[Constants.PARAM_COLLAPSE_KEY] = message.collapseKey;
	}
	for (var data in message.data) {
		body[Constants.PARAM_PAYLOAD_PREFIX + data] = message.data[data];
	}

	var requestBody = querystring.stringify(body);

	var post_options = {
      	host: Constants.GCM_SEND_ENDPOINT,
      	port: '443',
      	path: Constants.GCM_SEND_ENDPATH,
      	method: 'POST',
      	headers: {
          	'Content-Type' : 'application/x-www-form-urlencoded',
          	'Content-length' : requestBody.length,
          	'Authorization' : 'key=' + this.key
      	}
  	};

  	var post_req = https.request(post_options, function(res) {
      	res.setEncoding('utf-8');
      	var statusCode = res.statusCode;

      	res.on('data', function (data) {
        	if (data.indexOf('Error=') === 0) {
                result.errorCode = data.substring(6).trim();
                callback(result);
            }
            else if (data.indexOf('id=') === 0) {
                result.messageId = data.substring(3).trim();
                callback(result);
            }
            else callback();

    	});
  	});

  	post_req.write(requestBody);
  	post_req.end();
}