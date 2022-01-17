function ensureContainerEditable(container) {
	if (!container) {
		return;
	}

	if (isHtmlElement(container.lastChild, "br")) {
		return;
	}

	if ($_(container.childNodes).some(isVisible)) {
		return;
	}

	if (!jQuery.browser.msie || (jQuery.browser.version <= 7 && !isHtmlElement(container, "li"))) {
		container.appendChild(createEndBreak());
	}
}