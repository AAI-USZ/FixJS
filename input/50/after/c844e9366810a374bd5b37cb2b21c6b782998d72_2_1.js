function(){
					mw.log("AdPlugin: Done loading ads, run callback");
					// Wait until ads are loaded before running callback
					// ( ie we don't want to display the player until ads are ready )
					callback();
				}