function() {
		// Create a new TodoList instance to hold the todo items.
		var list = this.todoList = new TodoList();

		// Update the display when a new item is added to the list, or when the
		// entire list is reset.
		list.after( 'add', this.add, this );
		list.after( 'reset', this.reset, this );

		// Re-render the stats in the footer whenever an item is added, removed
		// or changed, or when the entire list is reset.
		list.after([
			'add',
			'reset',
			'remove',
			'todoModel:completedChange'
		], this.render, this );

		// Load saved items from localStorage, if available.
		list.load();
	}