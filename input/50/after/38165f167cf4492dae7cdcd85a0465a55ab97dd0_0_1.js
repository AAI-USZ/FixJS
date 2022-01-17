function(err, result)
	          {
	            
	            // call the callback
	            method.call(scope, err, result);
	              
	          //  console.log("NEXT IN CALLBACK", method.toString())
	            // call the next item
	            self.next();

	          }