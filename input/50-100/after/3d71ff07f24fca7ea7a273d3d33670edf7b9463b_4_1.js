function(focused) {
	todomvc.view.ToDoItemControl.superClass_.setFocused.call(this, focused);
	if (!focused && this.isSelected()) {
		/**
		 * @type {Element}
		 */
		var inputElement = this.getRenderer().getInputElement(
				this.getElement());
		this.setContent(inputElement.value);
		this.setSelected(false);
		this.dispatchEvent(todomvc.view.ToDoItemControl.EventType.EDIT);
	}
}