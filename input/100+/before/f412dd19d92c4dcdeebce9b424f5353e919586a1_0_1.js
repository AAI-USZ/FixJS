function(event) {
	// Update the story tiddler if specified
	if(this.hasParameter("story")) {
		this.getStory();
		var template = this.params.defaultViewTemplate || "$:/templates/ViewTemplate",
			t,tiddler,slot;
		// See if the tiddler is already there
		for(t=0; t<this.story.tiddlers.length; t++) {
			if(this.story.tiddlers[t].title === event.navigateTo) {
				tiddler = t;
			}
		}
		// If not we need to add it
		if(tiddler === undefined) {
			// First we try to find the position of the story element we navigated from
			var navigateFromTitle;
			if(event.navigateFromStoryElement) {
				navigateFromTitle = event.navigateFromStoryElement.params.target;
			}
			slot = 0;
			if(navigateFromTitle !== undefined) {
				for(t=0; t<this.story.tiddlers.length; t++) {
					if(this.story.tiddlers[t].title === navigateFromTitle) {
						slot = t + 1;
					}
				}	
			}
			// Add the tiddler
			this.story.tiddlers.splice(slot,0,{title: event.navigateTo});
			// Save the story
			this.saveStory();
		}
	}
	// Set the tiddler if specified
	if(this.hasParameter("set")) {
		this.wiki.setTextReference(this.params.set,event.navigateTo);
	}
	// Add a new record to the top of the history stack
	this.getHistory();
	this.history.stack.push({
		title: event.navigateTo,
		fromTitle: event.navigateFromTitle,
		fromPosition: event.navigateFrom.getNodeBounds()
	});
	this.saveHistory();
	event.stopPropagation();
	return false;
}