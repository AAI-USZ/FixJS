function( prefix ) {
	
			this.prefix = prefix;
	
			var storeOnline = this.getPreference("online-storage");
			
			if ( storeOnline === null || typeof storeOnline === "undefined" ) {
	
				//Setup the default values!!
				
				console.log("Setting up the default values :)");
				this.setPreference("online-storage", true);
				this.setPreference("ls-ls-limit-width", true);
				this.setPreference("p-p-limit-height", true);
				this.setPreference("ls-ls-force-width", true);
				this.setPreference("p-p-force-height", true);
	
			} else {
	
				if ( true.toString() === storeOnline.toString() ) {
	
					//Show Auth dialog...
					window.setTimeout(function(){window.ce.fireEvent( ON_AUTH_REQUIRED, this );},0);
	
				} else {
	
					//Declare Auth success.
					window.setTimeout(function(){window.ce.fireEvent( ON_AUTH_SUCCESS, this );},0);
	
				}
	
			}
	
		}