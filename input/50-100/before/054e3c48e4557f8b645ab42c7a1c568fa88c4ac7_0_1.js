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

	if (!jQuery.browser.msie) {
		container.appendChild(createEndBreak());
	}
}