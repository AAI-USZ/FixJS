function(response) {
			try {
				throw 'Error decoding sound at `' + url + '`. This is as good as the error gets. Sorry.';
			} catch (message) {
				if (typeof err === 'function') {
					err(message, request);
				}
			}
		}