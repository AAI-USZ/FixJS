function(e) {
	if (e.keyCode === goog.events.KeyCodes.ENTER) {
		/**
		 * @type {todomvc.model.ToDoItem}
		 */
		var model = new todomvc.model.ToDoItem(newToDo.value);
		
		/**
		 * @type {todomvc.view.ToDoItemControl}
		 */
		var control = new todomvc.view.ToDoItemControl();
		
		// do optimised model view sync
		items.push(model);
		
		control.setContent(model.getNote());
		control.setChecked(model.isDone());
		control.setModel(model);
		
		container.addChild(control, true);
		
		// clear the input box
		newToDo.value = '';
		
		updateStats();
	}
}