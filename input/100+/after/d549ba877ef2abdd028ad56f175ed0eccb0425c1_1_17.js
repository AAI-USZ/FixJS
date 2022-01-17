function isSimpleModifiableElement(node) {
	// "A simple modifiable element is an HTML element for which at least one
	// of the following holds:"
	if (!isHtmlElement(node)) {
		return false;
	}

	// Only these elements can possibly be a simple modifiable element.
	if ($_( ["A", "B", "EM", "FONT", "I", "S", "SPAN", "STRIKE", "STRONG", "SUB", "SUP", "U"] ).indexOf(node.tagName) == -1) {
		return false;
	}

	// "It is an a, b, em, font, i, s, span, strike, strong, sub, sup, or u
	// element with no attributes."
	if (node.attributes.length == 0) {
		return true;
	}

	// If it's got more than one attribute, everything after this fails.
	if (node.attributes.length > 1) {
		return false;
	}

	// "It is an a, b, em, font, i, s, span, strike, strong, sub, sup, or u
	// element with exactly one attribute, which is style, which sets no CSS
	// properties (including invalid or unrecognized properties)."
	//
	// Not gonna try for invalid or unrecognized.
	if ($_( node ).hasAttribute("style")
	&& getStyleLength(node) == 0) {
		return true;
	}

	// "It is an a element with exactly one attribute, which is href."
	if (node.tagName == "A"
	&& $_( node ).hasAttribute("href")) {
		return true;
	}

	// "It is a font element with exactly one attribute, which is either color,
	// face, or size."
	if (node.tagName == "FONT"
	&& ($_( node ).hasAttribute("color")
	|| $_( node ).hasAttribute("face")
	|| $_( node ).hasAttribute("size")
	)) {
		return true;
	}

	// "It is a b or strong element with exactly one attribute, which is style,
	// and the style attribute sets exactly one CSS property (including invalid
	// or unrecognized properties), which is "font-weight"."
	if ((node.tagName == "B" || node.tagName == "STRONG")
	&& $_( node ).hasAttribute("style")
	&& getStyleLength(node) == 1
	&& node.style.fontWeight != "") {
		return true;
	}

	// "It is an i or em element with exactly one attribute, which is style,
	// and the style attribute sets exactly one CSS property (including invalid
	// or unrecognized properties), which is "font-style"."
	if ((node.tagName == "I" || node.tagName == "EM")
	&& $_( node ).hasAttribute("style")
	&& getStyleLength(node) == 1
	&& node.style.fontStyle != "") {
		return true;
	}

	// "It is an a, font, or span element with exactly one attribute, which is
	// style, and the style attribute sets exactly one CSS property (including
	// invalid or unrecognized properties), and that property is not
	// "text-decoration"."
	if ((node.tagName == "A" || node.tagName == "FONT" || node.tagName == "SPAN")
	&& $_( node ).hasAttribute("style")
	&& getStyleLength(node) == 1
	&& node.style.textDecoration == "") {
		return true;
	}

	// "It is an a, font, s, span, strike, or u element with exactly one
	// attribute, which is style, and the style attribute sets exactly one CSS
	// property (including invalid or unrecognized properties), which is
	// "text-decoration", which is set to "line-through" or "underline" or
	// "overline" or "none"."
	if ($_( ["A", "FONT", "S", "SPAN", "STRIKE", "U"] ).indexOf(node.tagName) != -1
	&& $_( node ).hasAttribute("style")
	&& getStyleLength(node) == 1
	&& (node.style.textDecoration == "line-through"
	|| node.style.textDecoration == "underline"
	|| node.style.textDecoration == "overline"
	|| node.style.textDecoration == "none")) {
		return true;
	}

	return false;
}