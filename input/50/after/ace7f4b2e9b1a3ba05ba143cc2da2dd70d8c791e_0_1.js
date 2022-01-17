function(req, res){
					res.header('Cache-Control', 'public max-age=2592000')
					res.header('Expires', 'Sat, 28 Apr 2100 10:00:00 GMT')
					res.head('Content-Type', mimeType)
					res.send(buffer)
					/*
					res.send(buffer, {
						'Cache-Control': 'public max-age=2592000', 
						'Expires': 'Sat, 28 Apr 2100 10:00:00 GMT',
						'Content-Type': mimeType
						});*/
				}