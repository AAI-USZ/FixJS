function() {
			return {
				title: this.input.val().trim(),
				order: Todos.nextOrder(),
				completed: false
			};
		}