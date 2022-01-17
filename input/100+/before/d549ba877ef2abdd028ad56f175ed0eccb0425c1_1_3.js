function normalizeColor(color) {
	if (color.toLowerCase() == "currentcolor") {
		return null;
	}

	var outerSpan = document.createElement("span");
	document.body.appendChild(outerSpan);
	outerSpan.style.color = "black";

	var innerSpan = document.createElement("span");
	outerSpan.appendChild(innerSpan);
	innerSpan.style.color = color;
	color = getComputedStyle(innerSpan).color;

	if (color == "rgb(0, 0, 0)") {
		// Maybe it's really black, maybe it's invalid.
		outerSpan.color = "white";
		color = getComputedStyle(innerSpan).color;
		if (color != "rgb(0, 0, 0)") {
			return null;
		}
	}

	document.body.removeChild(outerSpan);

	// I rely on the fact that browsers generally provide consistent syntax for
	// getComputedStyle(), although it's not standardized.  There are only two
	// exceptions I found:
	if (/^rgba\([0-9]+, [0-9]+, [0-9]+, 1\)$/.test(color)) {
		// IE10PP2 seems to do this sometimes.
		return color.replace("rgba", "rgb").replace(", 1)", ")");
	}
	if (color == "transparent") {
		// IE10PP2, Firefox 7.0a2, and Opera 11.50 all return "transparent" if
		// the specified value is "transparent".
		return "rgba(0, 0, 0, 0)";
	}
	return color;
}