function(response) {
			try {
				throw 'Error decoding sound at `' + url + '`. This is as good as the error gets. Sorry.';
			} catch (message) {
				err(message, request);
			}
		}