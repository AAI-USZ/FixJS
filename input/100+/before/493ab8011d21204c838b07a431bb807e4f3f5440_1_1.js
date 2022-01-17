function(str, params, cb) {
	var site = url.parse(str);
	
		var post_options = {  
		  host: site.host,  
		  port: 80,  
		  path: site.pathname,  
		  method: 'POST',  
		  headers: {  
		    'Content-Type': 'application/x-www-form-urlencoded',  
		    'Content-Length': post_data.length  
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
		
		request.end();
}