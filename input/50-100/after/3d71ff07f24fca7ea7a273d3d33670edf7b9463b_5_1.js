function(control) {
	var html = todomvc.view.toDoItem({
		content : control.getContent()
	});
	var element = (/**@type {!Element}*/ goog.dom.htmlToDocumentFragment(html));
	this.setAriaStates(control, element);
	return element;
}