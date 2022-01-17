function() {
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
	}