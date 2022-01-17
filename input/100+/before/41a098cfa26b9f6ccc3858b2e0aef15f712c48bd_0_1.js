function lambda (result) {
			if(result === undefined) {
				if(attempt <= retries) {
					sendNoRetryMethod(message, registrationId, lambda);
				}
				else console.log('Could not send message after ' + attempt + 'attempts'); 
				attempt++;
			}
			else callback(result);
		}