function() {
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
	}