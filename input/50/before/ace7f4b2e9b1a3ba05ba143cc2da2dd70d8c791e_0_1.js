function(req, res){
				
					res.send(buffer, {
						'Cache-Control': 'public max-age=2592000', 
						'Expires': 'Sat, 28 Apr 2100 10:00:00 GMT',
						'Content-Type': mimeType
						});
				}