function(e) {
		        console.log('Write failed: ' + e.toString());
		        deferred.reject(e.toString());
		      }