function( prefix ) {

			var self = this;	
			this.prefix = prefix;

			Events.attach(window, "load", function() {

				var storeOnline = self.getPreference("online-storage");
				
				if ( storeOnline === null || typeof storeOnline === "undefined" ) {
		
					//Setup the default values!!
					
					console.log("Setting up the default values :)");
					self.setPreference("online-storage", true);
					self.setPreference("ls-ls-limit-width", true);
					self.setPreference("p-p-limit-height", true);
					self.setPreference("ls-ls-force-width", true);
					self.setPreference("p-p-force-height", true);
		
				} else {
		
					if ( true.toString() === storeOnline.toString() ) {
		
						//Show Auth dialog...
						window.setTimeout(function(){window.ce.fireEvent( ON_AUTH_REQUIRED, self );},0);
		
					} else {
		
						//Declare Auth success.
						window.setTimeout(function(){window.ce.fireEvent( ON_AUTH_SUCCESS, self );},0);
		
					}
		
				}

			} );
	
		}