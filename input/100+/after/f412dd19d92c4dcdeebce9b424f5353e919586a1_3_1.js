function(storyElementNode) {
	setStoryElementStyles(storyElementNode.domNode);
	$tw.scroller.scrollIntoView(storyElementNode.domNode);
}