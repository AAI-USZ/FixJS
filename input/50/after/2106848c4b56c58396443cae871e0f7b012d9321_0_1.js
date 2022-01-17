function() {
			this.save({completed: !this.get("completed")});
			window.app.Todos.trigger('reset');
		}