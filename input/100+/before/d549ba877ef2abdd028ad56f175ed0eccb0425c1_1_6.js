function isExtraneousLineBreak(br) {
	if (!isHtmlElement(br, "br")) {
		return false;
	}

	if (isHtmlElement(br.parentNode, "li")
	&& br.parentNode.childNodes.length == 1) {
		return false;
	}

	// Make the line break disappear and see if that changes the block's
	// height.  Yes, this is an absurd hack.  We have to reset height etc. on
	// the reference node because otherwise its height won't change if it's not
	// auto.
	var ref = br.parentNode;
	while (getComputedStyle(ref).display == "inline") {
		ref = ref.parentNode;
	}
	var refStyle = ref.hasAttribute("style") ? ref.getAttribute("style") : null;
	ref.style.height = "auto";
	ref.style.maxHeight = "none";
	ref.style.minHeight = "0";
	var brStyle = br.hasAttribute("style") ? br.getAttribute("style") : null;
	var origHeight = ref.offsetHeight;
	if (origHeight == 0) {
		throw "isExtraneousLineBreak: original height is zero, bug?";
	}
	br.setAttribute("style", "display:none");
	var finalHeight = ref.offsetHeight;
	if (refStyle === null) {
		// Without the setAttribute() line, removeAttribute() doesn't work in
		// Chrome 14 dev.  I have no idea why.
		ref.setAttribute("style", "");
		ref.removeAttribute("style");
	} else {
		ref.setAttribute("style", refStyle);
	}
	if (brStyle === null) {
		br.removeAttribute("style");
	} else {
		br.setAttribute("style", brStyle);
	}

	return origHeight == finalHeight;
}