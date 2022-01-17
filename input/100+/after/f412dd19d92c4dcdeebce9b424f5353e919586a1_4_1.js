function Zoomin(story) {
	// Save the story
	this.story = story;
	this.storyNode = this.story.child.domNode;
	// Set the current tiddler
	this.currentTiddler = this.story.child.children[0];
	// Make all the tiddlers position absolute, and hide all but the first one
	this.storyNode.style.position = "relative";
	for(var t=0; t<this.storyNode.children.length; t++) {
		if(t) {
			this.storyNode.children[t].style.display = "none";
		}
		this.storyNode.children[t].style.position = "absolute";
	}
}