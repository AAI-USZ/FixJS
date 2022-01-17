function () {
			var done = this.allCheckbox.checked;
			Todos.each(function (todo) { todo.save({'done': done}); });
		}