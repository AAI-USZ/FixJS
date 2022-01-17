function(record) {
		if(record instanceof fcgi.records.BeginRequest) {
			console.error("Creaing req object for " + requestId);
			req = new http.IncomingMessage(null)
		}
		
		else if(record instanceof fcgi.records.Params) {
			record.params.forEach(function(paramPair) {
				req._addHeaderLine(paramPair[0].toLowerCase().replace("_", "-"), paramPair[1]);
			});
			
			if(record.params.length == 0) {
				// Fill in the request object.
				var httpVersionStr = req.headers["server-protocol"] || "HTTP/1.1";
				var httpVersionParts = httpVersionStr.replace(/^HTTP\//, "").split(".");
				if(httpVersionParts.length != 2) httpVersionParts = [1, 1];
				req.httpVersionMajor = httpVersionParts[0];
				req.httpVersionMinor = httpVersionParts[1];
				req.httpVersion = req.httpVersionMajor + "." + req.httpVersionMinor;

				req.url = req.headers["request-uri"];
				req.method = req.headers["request-method"];

				// Setup http response.
				res = new http.ServerResponse(req);
				
				var fakeSocket = {
					writable: true,
					write: function(data, encoding) {
						var stdOutRecord = new fcgi.records.StdOut(data);
						stdOutRecord.encoding = encoding;
						fastcgiStream.writeRecord(requestId, stdOutRecord);
					},
					on: function(eventName, callback) {
						if (eventName == 'close') {
							socket.on('close', callback);
						} else {
							console.error("http server requested a listener on the '" + eventName + "' event name that will be ignored");
						}
					},
					removeListener: function(eventName, callback) {
						if (eventName == 'close') {
							socket.removeListener('close', callback);
						} else {
							console.error("http server requested a listener be removed from the '" + eventName + "' event name but it will be ignored");
						}
					}
				};
				
				res.assignSocket(fakeSocket);
				
				// TODO: would be nice to support this, but it's causing weird
				// shit when sent over the FCGI wire.
				res.useChunkedEncodingByDefault = false;

				// Sorta hacky, we override the _storeHeader implementation of 
				// OutgoingMessage and blank out the http response header line.
				// Instead, we parse it out and put it into the Status http header.
				// TODO: should we check if we're supposed to be sending NPH or 
				// something? Can we even do that in FCGI?
				res._storeHeader = function(statusLine, headers) {
					var matches = statusLine.match(/^HTTP\/[0-9]\.[0-9] (.+)/);
					headers["Status"] = matches[1];
					http.OutgoingMessage.prototype._storeHeader.apply(this, ["", headers]);
				};
				
				res.on("finish", function() {		
					res.detachSocket(fakeSocket);					
					
					var end = new fcgi.records.EndRequest(0, fcgi.records.EndRequest.protocolStatus.REQUEST_COMPLETE);
					fastcgiStream.writeRecord(requestId, end);

					closeConnection(socket);
				});
				
				try {
					server.emit("request", req, res);
				}
				catch(e) {
					console.error(e);
					
					var end = new fcgi.records.EndRequest(-1, fcgi.records.EndRequest.protocolStatus.REQUEST_COMPLETE);
					fastcgiStream.writeRecord(requestId, end);
					closeConnection(socket);
				}
			}
		}

		else if(record instanceof fcgi.records.StdIn) {
			if(record.data.length == 0) {
				// Emit "end" on the IncomingMessage.
				req.emit("end");
			}
			else {
				req.emit("data", record.data);
			}
		}		
	}