function() {								
					var end = new fcgi.records.EndRequest(0, fcgi.records.EndRequest.protocolStatus.REQUEST_COMPLETE);
					fastcgiStream.writeRecord(requestId, end);

					closeConnection(socket);
				}