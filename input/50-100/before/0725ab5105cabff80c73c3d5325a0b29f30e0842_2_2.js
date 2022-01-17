function() {
				seq++;
				console.log(wsResponse.id);
				connection.sendBytes(wslib.loadWsChunk(wsResponse.id,'',8,seq),function(err){
					if (err) console.error("send()end error: " + err);
				});
			}