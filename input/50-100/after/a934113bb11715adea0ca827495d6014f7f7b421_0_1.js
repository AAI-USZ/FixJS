function(err, rendered){

				// console.log(rendered);
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end(rendered);

		}