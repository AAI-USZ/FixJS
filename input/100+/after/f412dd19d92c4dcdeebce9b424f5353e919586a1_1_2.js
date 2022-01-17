function() {
	// Read the history tiddler
	this.getHistory();
	if(this.storyview) {
		var t,indexTo,indexFrom,
			topCommon = Math.min(this.history.stack.length,this.prevHistory.stack.length);
		// Find the common heritage of the new history stack and the previous one
		for(t=0; t<topCommon; t++) {
			if(this.history.stack[t].title !== this.prevHistory.stack[t].title) {
				topCommon = t;
				break;
			}
		}
		// We now navigate backwards through the previous history to get back to the common ancestor
		for(t=this.prevHistory.stack.length-1; t>=topCommon; t--) {
			indexTo = this.findStoryElementByTitle(0,this.prevHistory.stack[t].fromTitle);
			indexFrom = this.findStoryElementByTitle(0,this.prevHistory.stack[t].title);
			// Call the story view if it defines a navigateBack() method
			if(indexTo !== undefined && indexFrom !== undefined && this.storyview.navigateBack) {
				this.storyview.navigateBack(this.storyNode.children[indexTo],this.storyNode.children[indexFrom],this.prevHistory.stack[t]);
			}
		}
		// And now we navigate forwards through the new history to get to the latest tiddler
		for(t=topCommon; t<this.history.stack.length; t++) {
			indexTo = this.findStoryElementByTitle(0,this.history.stack[t].title);
			indexFrom = this.findStoryElementByTitle(0,this.history.stack[t].fromTitle);
			if(indexTo !== undefined && this.storyview.navigateForward) {
				this.storyview.navigateForward(this.storyNode.children[indexTo],
					indexFrom !== undefined ? this.storyNode.children[indexFrom] : undefined,
					this.history.stack[t]);
			}
		}
	}
	// Record the history stack for next time
	this.prevHistory = this.history;
	this.history = undefined;
}