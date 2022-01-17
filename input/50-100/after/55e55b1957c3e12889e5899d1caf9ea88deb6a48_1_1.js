function(err) {
 			if (err !== null) {
				console.log("QUERY ERROR: " + err);
			  console.log(new Error().stack);
			  callback = null;
			}
      
		  if (callback !== undefined && callback !== null) {
        console.log("UPDATE callback");
        callback(response);
      } 
		  
      console.log("UPDATE finished");
        response.end();
    }