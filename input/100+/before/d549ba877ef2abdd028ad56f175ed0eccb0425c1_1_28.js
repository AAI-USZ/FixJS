function getLegacyFontSize(size) {
	// For convenience in other places in my code, I handle all sizes, not just
	// pixel sizes as the spec says.  This means pixel sizes have to be passed
	// in suffixed with "px", not as plain numbers.
	size = normalizeFontSize(size);

	if (["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large"].indexOf(size) == -1
	&& !/^[0-9]+(\.[0-9]+)?(cm|mm|in|pt|pc|px)$/.test(size)) {
		// There is no sensible legacy size for things like "2em".
		return null;
	}

	var font = document.createElement("font");
	document.body.appendChild(font);
	if (size == "xxx-large") {
		font.size = 7;
	} else {
		font.style.fontSize = size;
	}
	var pixelSize = parseInt(getComputedStyle(font).fontSize);
	document.body.removeChild(font);

	// "Let returned size be 1."
	var returnedSize = 1;

	// "While returned size is less than 7:"
	while (returnedSize < 7) {
		// "Let lower bound be the resolved value of "font-size" in pixels
		// of a font element whose size attribute is set to returned size."
		var font = document.createElement("font");
		font.size = returnedSize;
		document.body.appendChild(font);
		var lowerBound = parseInt(getComputedStyle(font).fontSize);

		// "Let upper bound be the resolved value of "font-size" in pixels
		// of a font element whose size attribute is set to one plus
		// returned size."
		font.size = 1 + returnedSize;
		var upperBound = parseInt(getComputedStyle(font).fontSize);
		document.body.removeChild(font);

		// "Let average be the average of upper bound and lower bound."
		var average = (upperBound + lowerBound)/2;

		// "If pixel size is less than average, return the one-element
		// string consisting of the digit returned size."
		if (pixelSize < average) {
			return String(returnedSize);
		}

		// "Add one to returned size."
		returnedSize++;
	}

	// "Return "7"."
	return "7";
}