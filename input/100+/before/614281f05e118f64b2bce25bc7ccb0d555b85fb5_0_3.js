function() {
	
			if(navigator.onLine && !isLoaded) {
				isOnline = true;
				isLoaded = true;
				Cache.fire("statusChange", 1);
				return;
			}
			
			stop();
						
			active = setTimeout(function() {

				if (navigator.onLine && !isLoaded) {
					isOnline = true;
					isLoaded = true;
					Cache.fire("statusChange", 1);
				} else if (navigator.onLine) {
				  				  
				  Ajax.load({
				  	url: 'ping.js', 
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
				
			}, (isLoaded ? 100 : 0));
			
		}