function(){
		
		// check if disabled by steal.loading()
		if (!support.interactive) {
			return;
		}
			
		var interactive = getCachedInteractiveScript();
		// if no interactive script, this is a steal coming from inside a steal, let complete handle it
		if (!interactive || !interactive.src || /steal\.(production|production\.[a-zA-Z0-9\-\.\_]*)*js/.test(interactive.src)) {
			return;
		}
		// get the source of the script
		var src = interactive.src;
		// create an array to hold all steal calls for this script
		if (!interactives[src]) {
			interactives[src] = []
		}
		// add to the list of steals for this script tag
		if (src) {
			interactives[src].push.apply(interactives[src], pending);
			pending = [];
		}
	}