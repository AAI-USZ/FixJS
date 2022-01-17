function lambda (result) {
			
			if(result === undefined) {
				if(attempt < retries) {
					var sleepTime = backoff * 2 * attempt;
					if (sleepTime > Constants.MAX_BACKOFF_DELAY)
						sleepTime = Constants.MAX_BACKOFF_DELAY;
					timer.setTimeout(function () {
							sendNoRetryMethod(message, registrationId, lambda);
					},sleepTime);
				}
				else {
					console.log('Could not send message after ' + retries + ' attempts');
					callback(result);
					} 
				attempt++;
			}
			else callback(result);
		}