function (todo) {
			// Passing {'delete': true} to the todo model's `destroy()` method
			// tells it to delete itself from localStorage as well.
			todo.destroy({'delete': true});
		}