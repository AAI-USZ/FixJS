function areLooselyEquivalentValues(command, val1, val2) {
	if (areEquivalentValues(command, val1, val2)) {
		return true;
	}

	if (command != "fontsize"
	|| typeof val1 != "string"
	|| typeof val2 != "string") {
		return false;
	}

	// Static variables in JavaScript?
	var callee = areLooselyEquivalentValues;
	if (callee.sizeMap === undefined) {
		callee.sizeMap = {};
		var font = document.createElement("font");
		document.body.appendChild(font);
		$_( ["xx-small", "small", "medium", "large", "x-large", "xx-large",
		"xxx-large"] ).forEach(function(keyword) {
			font.size = cssSizeToLegacy(keyword);
			callee.sizeMap[keyword] = $_.getComputedStyle(font).fontSize;
		});
		document.body.removeChild(font);
	}

	return val1 === callee.sizeMap[val2]
		|| val2 === callee.sizeMap[val1];
}