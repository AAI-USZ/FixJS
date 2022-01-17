function lambda (err, result) {

				if(attempt < retries) {
					var sleepTime = backoff * 2 * attempt;
					if (sleepTime > Constants.MAX_BACKOFF_DELAY)
						sleepTime = Constants.MAX_BACKOFF_DELAY;
					
					var unsentRegIds = [];

					for (var i = 0; i < registrationId.length;i++) {
						if (result.results[i].error === 'Unavailable')
							unsentRegIds.push(registrationId[i]); 
					}

					registrationId = unsentRegIds;
					if(registrationId.length !== 0) {
						timer.setTimeout(function () {
							sendNoRetryMethod(message, registrationId, lambda);
						},sleepTime);
						attempt++;
					}
					else callback(null, result);	
				}
				else {
					console.log('Could not send message to all devices after ' + retries + ' attempts');
					callback(null, result);
				} 
		}