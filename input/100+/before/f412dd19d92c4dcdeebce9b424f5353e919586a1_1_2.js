function() {
	// Read the history tiddler
	this.getHistory();
	if(this.storyview) {
		var t,index,
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
			index = this.findStoryElementByTitle(0,this.prevHistory.stack[t].title);
			if(index !== undefined && this.storyview.navigateBack) {
				this.storyview.navigateBack(this.storyNode.children[index],this.history.stack[t]);
			}
		}
		// And now we navigate forwards through the new history to get to the latest tiddler
		for(t=topCommon; t<this.history.stack.length; t++) {
			index = this.findStoryElementByTitle(0,this.history.stack[t].title);
			if(index !== undefined && this.storyview.navigateForward) {
				this.storyview.navigateForward(this.storyNode.children[index],this.history.stack[t]);
			}
		}
	}
	// Record the history stack for next time
	this.prevHistory = this.history;
	this.history = undefined;
}