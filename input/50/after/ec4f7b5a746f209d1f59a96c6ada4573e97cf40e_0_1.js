function(provider, response) {
			if(!response.result.authorized) {
					window.location = './';
			}
		}