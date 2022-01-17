function(chunk) {
					seq++;
					console.log(wsResponse.id);
					connection.sendBytes(wslib.loadWsChunk(wsResponse.id,
								chunk,1,seq),function(err){
							if (err){
								console.error("send()data error: " + err);
							}
						});
						
					}