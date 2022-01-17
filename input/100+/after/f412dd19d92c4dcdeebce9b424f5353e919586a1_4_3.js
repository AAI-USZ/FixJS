function(toStoryElement,fromStoryElement,historyInfo) {
	// Make the new tiddler be position absolute and visible so that we can measure it
	toStoryElement.domNode.style.position = "absolute";
	toStoryElement.domNode.style.display = "block";
	toStoryElement.domNode.style[$tw.browser.transformorigin] = "0 0";
	toStoryElement.domNode.style[$tw.browser.transform] = "translateX(0px) translateY(0px) scale(1)";
	toStoryElement.domNode.style[$tw.browser.transition] = "none";
	toStoryElement.domNode.style.opacity = "0.0";
	// Get the position of the source node, or use the centre of the window as the source position
	var sourceBounds = historyInfo.fromPosition || {
			left: window.innerWidth/2 - 2,
			top: window.innerHeight/2 - 2,
			width: window.innerWidth/8,
			height: window.innerHeight/8
		};
	// Try to find the title node in the target tiddler
	var titleNode = findTitleNode(toStoryElement) || toStoryElement,
		titleBounds = titleNode.getNodeBounds();
	// Compute the transform for the target tiddler to make the title lie over the source rectange
	var targetBounds = toStoryElement.getNodeBounds(),
		scale = sourceBounds.width / titleBounds.width,
		x = sourceBounds.left - targetBounds.left - (titleBounds.left - targetBounds.left) * scale,
		y = sourceBounds.top - targetBounds.top - (titleBounds.top - targetBounds.top) * scale;
	// Transform the target tiddler to its starting position
	toStoryElement.domNode.style[$tw.browser.transform] = "translateX(" + x + "px) translateY(" + y + "px) scale(" + scale + ")";
	// Get the animation duration
	var d = $tw.config.preferences.animationDuration + "ms";
	// Apply the ending transitions with a timeout to ensure that the previously applied transformations are applied first
	var self = this,
		prevCurrentTiddler = this.currentTiddler;
	this.currentTiddler = toStoryElement;
	$tw.utils.nextTick(function() {
		// Transform the target tiddler to its natural size
		toStoryElement.domNode.style[$tw.browser.transition] = "-" + $tw.browser.prefix.toLowerCase() + "-transform " + d + " ease-in-out, opacity " + d + " ease-out";
		toStoryElement.domNode.style.opacity = "1.0";
		toStoryElement.domNode.style[$tw.browser.transform] = "translateX(0px) translateY(0px) scale(1)";
		toStoryElement.domNode.style.zIndex = "500";
		// Transform the previous tiddler out of the way and then hide it
		if(prevCurrentTiddler && prevCurrentTiddler !== toStoryElement) {
			var scale = titleBounds.width / sourceBounds.width;
			x =  titleBounds.left - targetBounds.left - (sourceBounds.left - targetBounds.left) * scale;
			y =  titleBounds.top - targetBounds.top - (sourceBounds.top - targetBounds.top) * scale;
			prevCurrentTiddler.domNode.style[$tw.browser.transition] = "-" + $tw.browser.prefix.toLowerCase() + "-transform " + d + " ease-in-out, opacity " + d + " ease-out";
			prevCurrentTiddler.domNode.style.opacity = "0.0";
			prevCurrentTiddler.domNode.style[$tw.browser.transformorigin] = "0 0";
			prevCurrentTiddler.domNode.style[$tw.browser.transform] = "translateX(" + x + "px) translateY(" + y + "px) scale(" + scale + ")";
			prevCurrentTiddler.domNode.style.zIndex = "0";
			var eventHandler = function(event) {
					// Hide the DOM node when the transition is over
					if(self.currentTiddler !== prevCurrentTiddler) {
						prevCurrentTiddler.domNode.style.display = "none";
					}
					prevCurrentTiddler.domNode.removeEventListener($tw.browser.transitionEnd,eventHandler,true);
				};
			prevCurrentTiddler.domNode.addEventListener($tw.browser.transitionEnd,eventHandler,true);
		}
		// Scroll the target into view
		$tw.scroller.scrollIntoView(toStoryElement.domNode);
	});
}