function(){
				// Add the ads to the player:
				mw.addKalturaAds( embedPlayer, function(){
					mw.log("AdPlugin ( done loading ads, run callback:");
					// Wait until ads are loaded before running callback
					// ( ie we don't want to display the player until ads are ready )
					callback();
				});
			}