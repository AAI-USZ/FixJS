function(encodedData) {
		console.groupCollapsed('SWFM.RPC.decode()');
		console.debug('Arguments: ', arguments);

		var data = Ext.JSON.decode(encodedData);
		if (data['jsonrpc'] !== undefined) {
			if (data['result'] !== undefined) {
				console.groupEnd();

				return {
					success: true,
					result: data['result'],
					error: undefined
				};
			} else {
				var errorCode;
				var errorMessage = 'Internal error: Wrong response from backend.';
				var errorData;
				if (data['error'] !== undefined) {
					if (data['error']['code'] !== undefined) {
						errorCode = data['error']['code'];
					}
					if (data['error']['message'] !== undefined) {
						errorMessage = data['error']['message'];
					}
					if (data['error']['data'] !== undefined) {
						errorData = data['error']['data'];
					}
				}
				var ret = {
					success: false,
					result: undefined,
					error: {
						code: errorCode,
						message: errorMessage,
						data: errorData
					}
				};
				console.groupEnd();

				return ret;
			}
		}

		console.groupEnd();
		//ToDo:
		return {
			success: false,
			result: undefined,
			error: {
				code: -1,
				message: 'internal error',
				data: undefined
			}
		};
	}