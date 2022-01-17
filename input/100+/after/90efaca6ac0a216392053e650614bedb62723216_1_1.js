function() {

			console.log('addall', window.app.TodoFilter);

			this.$("#todo-list").html('');

			switch(window.app.TodoFilter){
				case "active":
					_.each(window.app.Todos.remaining(), this.addOne);
					break;
				case "completed":
					_.each(window.app.Todos.completed(), this.addOne);
					break;
				default:
					window.app.Todos.each(this.addOne, this);
					break;
			}

		}