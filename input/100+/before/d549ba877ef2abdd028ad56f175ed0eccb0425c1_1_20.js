function getSpecifiedCommandValue(element, command) {
	// "If command is "backColor" or "hiliteColor" and element's display
	// property does not have resolved value "inline", return null."
	if ((command == "backcolor" || command == "hilitecolor")
	&& getComputedStyle(element).display != "inline") {
		return null;
	}

	// "If command is "createLink" or "unlink":"
	if (command == "createlink" || command == "unlink") {
		// "If element is an a element and has an href attribute, return the
		// value of that attribute."
		if (isHtmlElement(element)
		&& element.tagName == "A"
		&& element.hasAttribute("href")) {
			return element.getAttribute("href");
		}

		// "Return null."
		return null;
	}

	// "If command is "subscript" or "superscript":"
	if (command == "subscript" || command == "superscript") {
		// "If element is a sup, return "superscript"."
		if (isHtmlElement(element, "sup")) {
			return "superscript";
		}

		// "If element is a sub, return "subscript"."
		if (isHtmlElement(element, "sub")) {
			return "subscript";
		}

		// "Return null."
		return null;
	}

	// "If command is "strikethrough", and element has a style attribute set,
	// and that attribute sets "text-decoration":"
	if (command == "strikethrough"
	&& element.style.textDecoration != "") {
		// "If element's style attribute sets "text-decoration" to a value
		// containing "line-through", return "line-through"."
		if (element.style.textDecoration.indexOf("line-through") != -1) {
			return "line-through";
		}

		// "Return null."
		return null;
	}

	// "If command is "strikethrough" and element is a s or strike element,
	// return "line-through"."
	if (command == "strikethrough"
	&& isHtmlElement(element, ["S", "STRIKE"])) {
		return "line-through";
	}

	// "If command is "underline", and element has a style attribute set, and
	// that attribute sets "text-decoration":"
	if (command == "underline"
	&& element.style.textDecoration != "") {
		// "If element's style attribute sets "text-decoration" to a value
		// containing "underline", return "underline"."
		if (element.style.textDecoration.indexOf("underline") != -1) {
			return "underline";
		}

		// "Return null."
		return null;
	}

	// "If command is "underline" and element is a u element, return
	// "underline"."
	if (command == "underline"
	&& isHtmlElement(element, "U")) {
		return "underline";
	}

	// "Let property be the relevant CSS property for command."
	var property = commands[command].relevantCssProperty;

	// "If property is null, return null."
	if (property === null) {
		return null;
	}

	// "If element has a style attribute set, and that attribute has the
	// effect of setting property, return the value that it sets property to."
	if (element.style[property] != "") {
		return element.style[property];
	}

	// "If element is a font element that has an attribute whose effect is
	// to create a presentational hint for property, return the value that the
	// hint sets property to.  (For a size of 7, this will be the non-CSS value
	// "xxx-large".)"
	if (isHtmlNamespace(element.namespaceURI)
	&& element.tagName == "FONT") {
		if (property == "color" && element.hasAttribute("color")) {
			return element.color;
		}
		if (property == "fontFamily" && element.hasAttribute("face")) {
			return element.face;
		}
		if (property == "fontSize" && element.hasAttribute("size")) {
			// This is not even close to correct in general.
			var size = parseInt(element.size);
			if (size < 1) {
				size = 1;
			}
			if (size > 7) {
				size = 7;
			}
			return {
				1: "xx-small",
				2: "small",
				3: "medium",
				4: "large",
				5: "x-large",
				6: "xx-large",
				7: "xxx-large"
			}[size];
		}
	}

	// "If element is in the following list, and property is equal to the
	// CSS property name listed for it, return the string listed for it."
	//
	// A list follows, whose meaning is copied here.
	if (property == "fontWeight"
	&& (element.tagName == "B" || element.tagName == "STRONG")) {
		return "bold";
	}
	if (property == "fontStyle"
	&& (element.tagName == "I" || element.tagName == "EM")) {
		return "italic";
	}

	// "Return null."
	return null;
}