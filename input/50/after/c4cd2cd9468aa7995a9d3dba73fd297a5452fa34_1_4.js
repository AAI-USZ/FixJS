function() {
	/** @type {Element} */
	var element = goog.dom.createElement(goog.dom.TagName.DIV);

	return ('draggable' in element) || ('ondragstart' in element && 'ondrop' in element);
}