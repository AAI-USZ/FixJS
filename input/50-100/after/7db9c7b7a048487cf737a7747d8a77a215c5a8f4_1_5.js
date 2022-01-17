function response (data, tabId, operation) {
			if (isAuthorized()) {
				if (!tabId || !operation) return;
				data.type = 'fileio-' + operation + '-response';
			}
			else {
				if (!tabId) {
					if (operationQueue.length == 0) return;
					tabId = operationQueue[0].tabId;
				}
				data.type = 'authorize-response';
			}
			extension.sendRequest(tabId, data);
		}