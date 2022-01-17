function(message) {
		if (message.type === 'utf8') {
			var wsRequest = JSON.parse(message.utf8Data);

			// ヘッダー調整
			if ('proxy-connection' in wsRequest.headers) {
				wsRequest.headers['Connection'] = wsRequest.headers['proxy-connection'];
				//wsRequest.headers['Connection'] = 'close';
				delete wsRequest.headers['proxy-connection'];
			}
			if ('cache-control' in wsRequest.headers) {
				delete wsRequest.headers['cache-control'];
			}
			var targetUri = parseUri(wsRequest.url);
			if (wsRequest.method != 'POST') {
				client_limit(targetUri.hostname, proxyConnection,
						wsRequest, connection);
			} else {
				clientRequests[wsRequest.id] = {
					hostname : targetUri.hostname,
					wsRequest : wsRequest
				};
			}
			
		} else if (message.type === 'binary') {
			var chunk = wslib.unloadWsChunk(message.binaryData);
			if(chunk.opcode == 1){
			clientRequests[chunk.id].wsRequest.data += chunk.payload;
			}else if(chunk.opcode ==8){
				var req = clientRequests[chunk.id];
				client_limit(req.hostname, proxyConnection, req.wsRequest,connection);
			}
		}
	}