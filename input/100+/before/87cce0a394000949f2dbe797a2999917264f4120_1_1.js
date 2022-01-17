function setKickstrap() {
		// Once all the plugins have loaded and had time to take off their shoes and have a martini, look at the user's custom stuff.
			$(window).load(function() {
				if(typeof window.kickstrap == 'function') {
					// function exists, so we can now call it
					kickstrap();
				}
			});
		}