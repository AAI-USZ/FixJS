function(storyElementNode) {
	var targetElement = storyElementNode.domNode;
	// Get the current width of the tiddler
	var currWidth = targetElement.offsetWidth;
	// Put a wrapper around the dom node we're closing
	var wrapperElement = document.createElement("div");
	targetElement.parentNode.insertBefore(wrapperElement,targetElement);
	wrapperElement.appendChild(targetElement);
	// Animate the closure
	var d = ($tw.config.preferences.animationDuration/1000).toFixed(8) + "s";
	wrapperElement.style.display = "inline-block";
	wrapperElement.style[$tw.browser.transformorigin] = "0% 0%";
	wrapperElement.style[$tw.browser.transform] = "translateY(0px)";
	wrapperElement.style.opacity = "1.0";
	wrapperElement.style.width = currWidth + "px";
	wrapperElement.style[$tw.browser.transition] = "-" + $tw.browser.prefix.toLowerCase() + "-transform " + d + " ease-in-out, " +
															"opacity " + d + " ease-out, " +
															"width " + d + " ease-in-out";
	$tw.utils.nextTick(function() {
		wrapperElement.style[$tw.browser.transform] = "translateY(" + window.innerHeight + "px)";
		wrapperElement.style.opacity = "0.0";
		wrapperElement.style.width = "0px";
	});
	// Attach an event handler for th eend of the transition
	wrapperElement.addEventListener($tw.browser.transitionEnd,function(event) {
		if(wrapperElement.parentNode) {
			wrapperElement.parentNode.removeChild(wrapperElement);
		}
	},true);
	// Returning true causes the DOM node not to be deleted
	return true;
}