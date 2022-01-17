function(str, params, cb) {
	var site = url.parse(str);
	  var newOnes = JSON.stringify(params);
	  params = JSON.parse(newOnes).json;
		
		var post_options = {  
		  host: site.host,  
		  port: 80,
		  path: site.pathname,  
		  method: 'POST',
		  headers: {
		    'Accept': "application/json",
		    'Content-Type': 'application/json',
		    'Content-Length': params.length
		  }
		};  
		
		var request = http.request(post_options);

		request.on('response', function(response){
		    var data = '';

		    response.on('data', function(chunk){ 
					data += chunk; 
		    });
		    response.on('end', function(){
					cb(data);
		    });
		});
		
		request.write(params);
		
		request.end();
}