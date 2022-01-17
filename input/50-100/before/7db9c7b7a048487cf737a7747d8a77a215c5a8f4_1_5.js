function response (data, tabId, operation) {
			if (isAuthorized()) {
				if (!tabId || !operation) return;
				data.type = 'fileio-' + operation + '-response';
				extension.sendRequest(tabId, data);
			}
			else {
				if (operationQueue.length == 0) return;
				data.type = 'authorize-response';
				extension.sendRequest(operationQueue[0].tabId, data);
			}
		}