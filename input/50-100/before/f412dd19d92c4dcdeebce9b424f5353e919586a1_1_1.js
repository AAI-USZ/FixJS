function(storyElementIndex) {
	var storyElement = this.storyNode.children[storyElementIndex];
	// Invoke the storyview to animate the removal
	if(this.storyview && this.storyview.remove) {
		if(!this.storyview.remove(storyElement)) {
			// Only delete the DOM element if the storyview.remove() returned false
			storyElement.domNode.parentNode.removeChild(storyElement.domNode);
		}
	}
	// Then delete the actual renderer node
	this.storyNode.children.splice(storyElementIndex,1);
}