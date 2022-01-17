function() {
		var numRemaining, numCompleted,
			todoList = this.todoList,
			main = this.container.one('#main'),
			footer = this.container.one('#footer');

		// Check the toggleAll checkbox when all todos are checked
		this.container.one('#toggle-all').set( 'checked', !todoList.remaining().length );

		// If there are no todo items, then clear the stats.
		// Ugly, but for some reason `main.hide()` doesn't work
		if ( todoList.isEmpty() ) {
			main._node.style.display = 'none';
			footer._node.style.display = 'none';
			return this;
		} else {
			main._node.style.display = 'block';
			footer._node.style.display = 'block';
		}

		// Figure out how many todo items are completed and how many remain.
		numCompleted = todoList.completed().length;
		numRemaining = todoList.remaining().length;

		// Update the statistics.
		footer.setContent(Y.Lang.sub( this.template, {
			numCompleted: numCompleted,
			numRemaining: numRemaining,
			remainingLabel: numRemaining === 1 ? 'item' : 'items'
		}));

		// If there are no completed todo items, don't show the "Clear
		// completed items" link.
		if ( !numCompleted ) {
			footer.one('#clear-completed').remove();
		}

		return this;
	}