function(req, res){
		switch(req.url) {
			case '/':
				fileServer.serveFile('./index.html', 200, {}, req, res);
				break;

			case '/client.js':
				fileServer.serveFile('./client.js', 200, {}, req, res);
				break;

			case '/require.js':
				fileServer.serveFile('./node_modules/requirejs/require.js', 200, {}, req, res);
				break;

			default:
				if(req.url.match(/^\/lib/)) {
					fileServer.serve(req, res);
				} else {
					res.writeHead(404, {'Content-Type': 'text/html'}); 
					res.end('<h1>404 not ... found</h1>'); 
				}
				break;
		}
	}