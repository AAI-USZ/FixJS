function(storyElementNode,historyInfo) {
	// Do nothing if the target tiddler is already the current tiddler
	if(storyElementNode === this.currTiddler) {
		return;
	}
	// Make the new tiddler be position absolute and visible
	storyElementNode.domNode.style.position = "absolute";
	storyElementNode.domNode.style.display = "block";
	storyElementNode.domNode.style[$tw.browser.transformorigin] = "0 0";
	storyElementNode.domNode.style[$tw.browser.transform] = "translateX(0px) translateY(0px) scale(1)";
	storyElementNode.domNode.style[$tw.browser.transition] = "none";
	// Get the position of the source node, or use the centre of the window as the source position
	var sourceBounds = historyInfo.fromPosition || {
			left: window.innerWidth/2 - 2,
			top: window.innerHeight/2 - 2,
			width: 4,
			height: 4
		};
	// Try to find the title node in the target tiddler
	var titleNode = findTitleNode(storyElementNode) || storyElementNode;
	// Compute the transform for the target tiddler to make the title lie over the source rectange
	var targetBounds = storyElementNode.getNodeBounds(),
		titleBounds = titleNode.getNodeBounds(),
		scale = sourceBounds.width / titleBounds.width,
		x = sourceBounds.left - targetBounds.left - (titleBounds.left - targetBounds.left) * scale,
		y = sourceBounds.top - targetBounds.top - (titleBounds.top - targetBounds.top) * scale;
	// Transform the target tiddler
	storyElementNode.domNode.style[$tw.browser.transform] = "translateX(" + x + "px) translateY(" + y + "px) scale(" + scale + ")";
	// Get the animation duration
	var d = ($tw.config.preferences.animationDuration/1000).toFixed(8) + "s";
	// Apply the ending transitions with a timeout to ensure that the previously applied transformations are applied first
	var self = this,
		currTiddler = this.currTiddler;
	$tw.utils.nextTick(function() {
		// Transform the target tiddler
		var currTiddlerBounds = currTiddler.getNodeBounds(),
			x = (currTiddlerBounds.left - targetBounds.left),
			y = (currTiddlerBounds.top - targetBounds.top);
		storyElementNode.domNode.style[$tw.browser.transition] = "-" + $tw.browser.prefix.toLowerCase() + "-transform " + d + " ease-in-out, opacity " + d + " ease-out";
		storyElementNode.domNode.style.opacity = "1.0";
		storyElementNode.domNode.style[$tw.browser.transform] = "translateX(" + x + "px) translateY(" + y + "px) scale(1)";
		storyElementNode.domNode.style.zIndex = "500";
		// Transform the current tiddler
		var scale = titleBounds.width / sourceBounds.width;
		x =  titleBounds.left - targetBounds.left - (sourceBounds.left - currTiddlerBounds.left) * scale;
		y =  titleBounds.top - targetBounds.top - (sourceBounds.top - currTiddlerBounds.top) * scale;
		currTiddler.domNode.style[$tw.browser.transition] = "-" + $tw.browser.prefix.toLowerCase() + "-transform " + d + " ease-in-out, opacity " + d + " ease-out";
		currTiddler.domNode.style.opacity = "0.0";
		currTiddler.domNode.style[$tw.browser.transformorigin] = "0 0";
		currTiddler.domNode.style[$tw.browser.transform] = "translateX(" + x + "px) translateY(" + y + "px) scale(" + scale + ")";
		currTiddler.domNode.style.zIndex = "0";
	});
	// Record the new current tiddler
	this.currTiddler = storyElementNode;
	// Save the tiddler in the stack
	this.prevTiddlers.push(storyElementNode.children[0].params.target);
}