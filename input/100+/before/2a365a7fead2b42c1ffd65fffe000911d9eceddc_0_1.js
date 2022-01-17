function() {
			
      var location = url.parse(request.url, true),
          params = (location.query || request.headers);
      if (location.pathname == '/config.json' && request.method == "GET") {
        response.writeHead(200, {
          'Content-Type': 'application/x-javascript'
        });
        var jsonString = JSON.stringify({
          port: self.settings.port
        });
        response.end(jsonString);
			} else if (location.pathname == '/stat/1.gif' && request.method == 'GET') {
				var time = +new Date();
				var origin;
				//db.enableIndex('users');
				//var results = db.search('users', { timestamp: [1330536456424,1330593323542] });
				//console.log(results);
				response.writeHead(200, {
		      		'Content-Type': 'image/gif'
		    	});
				origin = /\/(.*)\.gif/.exec(request.url);
				console.log(__dirname);
				if (origin) {
					//var ip = "128.121.50.133"
					var ip = request.headers['x-real-ip'];
					console.log(ip);
					city = new City("../../../../data/GeoLiteCity.dat");
					city.lookup(ip, function(err, location) {
							obj = {
								city: location.city
	            				, latitude: location.latitude
	            				, longitude: location.longitude
	            				, ip: ip
								, timestamp: time
							}
							console.log(obj);
							self.bayeux.getClient().publish('/stat', obj);
							// write to riak cluster
							//db.save('users', ip, obj, { index: {timestamp: time} });
							//console.log('was saved in the riak cluster');
					});
					//console.log(origin[1], request.connection.remoteAddress, request.headers['user-agent']);
				  
		    	}
				response.end("OK");
      } else {
        file.serve(request, response);
      }
    }