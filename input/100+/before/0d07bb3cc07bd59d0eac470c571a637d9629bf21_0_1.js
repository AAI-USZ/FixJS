function () {
		var todoList = this.todoList,
			stats    = this.container.one('#todo-stats'),
			numRemaining, numDone;

		// If there are no todo items, then clear the stats.
		if (todoList.isEmpty()) {
			stats.empty();
			return this;
		}

		// Figure out how many todo items are completed and how many remain.
		numDone      = todoList.done().length;
		numRemaining = todoList.remaining().length;

		// Update the statistics.
		stats.setContent(Y.Lang.sub(this.template, {
			numDone       : numDone,
			numRemaining  : numRemaining,
			doneLabel     : numDone === 1 ? 'task' : 'tasks',
			remainingLabel: numRemaining === 1 ? 'task' : 'tasks'
		}));

		// If there are no completed todo items, don't show the "Clear
		// completed items" link.
		if (!numDone) {
			stats.one('.todo-clear').remove();
		}

		return this;
	}