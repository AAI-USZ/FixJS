function() {

	todomvc.view.ToDoItemControl.superClass_.enterDocument.call(this);

	// prevent clicking the checkbox (or anything within the root element)

	// from having any default behaviour. This stops the checkbox being set

	// by the browser.

	this.getHandler().listen(this.getElement(), goog.events.EventType.CLICK,

			function(e) {

				e.preventDefault();

			});

}