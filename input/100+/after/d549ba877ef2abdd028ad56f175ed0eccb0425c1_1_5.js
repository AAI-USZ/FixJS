function isCollapsedLineBreak(br) {
	if (!isHtmlElement(br, "br")) {
		return false;
	}

	// Add a zwsp after it and see if that changes the height of the nearest
	// non-inline parent.  Note: this is not actually reliable, because the
	// parent might have a fixed height or something.
	var ref = br.parentNode;
	while ($_.getComputedStyle(ref).display == "inline") {
		ref = ref.parentNode;
	}

	var refStyle = $_( ref ).hasAttribute("style") ? ref.getAttribute("style") : null;
	ref.style.height = "auto";
	ref.style.maxHeight = "none";
	ref.style.minHeight = "0";
	var space = document.createTextNode("\u200b");
	var origHeight = ref.offsetHeight;
	if (origHeight == 0) {
		throw "isCollapsedLineBreak: original height is zero, bug?";
	}
	br.parentNode.insertBefore(space, br.nextSibling);
	var finalHeight = ref.offsetHeight;
	space.parentNode.removeChild(space);
	if (refStyle === null) {
		// Without the setAttribute() line, removeAttribute() doesn't work in
		// Chrome 14 dev.  I have no idea why.
		ref.setAttribute("style", "");
		ref.removeAttribute("style");
	} else {
		ref.setAttribute("style", refStyle);
	}

	// Allow some leeway in case the zwsp didn't create a whole new line, but
	// only made an existing line slightly higher.  Firefox 6.0a2 shows this
	// behavior when the first line is bold.
	return origHeight < finalHeight - 5;
}