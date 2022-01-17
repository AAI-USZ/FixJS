function(result)
	          {
	            
	            // call the callback
	            method.call(scope, result);
	              
	          //  console.log("NEXT IN CALLBACK", method.toString())
	            // call the next item
	            self.next();

	          }