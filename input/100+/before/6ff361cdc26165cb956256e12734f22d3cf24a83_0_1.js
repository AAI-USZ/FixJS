function() {
	if(this.macroNode.child && this.macroNode.child.children[0] && this.macroNode.child.children[0].type === "textarea") {
		var wrapper = this.macroNode.child.domNode,
			textarea = this.macroNode.child.children[0].domNode;
		// Set the text area height to 1px temporarily, which allows us to read the true scrollHeight
		var prevWrapperHeight = wrapper.style.height;
		wrapper.style.height = textarea.style.height + "px";
		textarea.style.overflow = "hidden";
//		textarea.style.height = "1px";
		textarea.style.height = Math.max(textarea.scrollHeight,MIN_TEXT_AREA_HEIGHT) + "px";
		wrapper.style.height = prevWrapperHeight;
	}
}