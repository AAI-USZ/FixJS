function() {
			return {
				title: this.input.val().trim(),
				order: Todos.nextOrder(),
				done: false
			};
		}