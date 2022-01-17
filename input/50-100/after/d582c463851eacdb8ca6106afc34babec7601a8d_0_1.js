function(method, params) {
		console.groupCollapsed('SmartWFM.lib.RPC.encode()');
		console.debug('Arguments: ', arguments);
		var data = Ext.JSON.encode({
			jsonrpc: '2.0',
			method: method,
			params: params
		});

		console.groupEnd();

		return data;
	}