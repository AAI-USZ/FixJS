function() {

				if (navigator.onLine && !isLoaded) {
					isOnline = true;
					isLoaded = true;
					Cache.fire("statusChange", 1);
				} else if (navigator.onLine) {
				  
				  var id = Math.floor(Math.random()*10000);
				  
				  Ajax.load({
				  	url: 'ping.js?q='+id, 
				  	type: "GET",
				  	success: function(req) {
					  	if (isOnline === false) {
					  		isOnline = true;
					  		Cache.fire("statusChange", 1);
					  	}
					  	
					  },
					  error: function(req) {
					  	if (isOnline === true) {
					  		isOnline = false;
					  		Cache.fire("statusChange", 0);
					  	}	
					  }
				  });
				  		  				  
				} else {
					
					setTimeout(function() {
						if (isOnline === true) {
							isOnline = false;
							Cache.fire("statusChange", 0);
						}
					}, 100);
				
				}
				
				active = null;
				if (poll) setTimeout(statusCallback, 10 * 1000);
				
			}