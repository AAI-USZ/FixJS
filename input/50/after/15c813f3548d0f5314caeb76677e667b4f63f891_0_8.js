function () {
			var completed = this.allCheckbox.checked;
			Todos.each(function (todo) { todo.save({'completed': completed}); });
		}