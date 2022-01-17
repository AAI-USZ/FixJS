function() {

			this.$("#todo-list").html('');

			switch(currentFilter){
				case "active":
					_.each(Todos.remaining(), this.addOne);
					break;
				case "completed":
					_.each(Todos.completed(), this.addOne);
					break;
				default:
					Todos.each(this.addOne, this);
					break;
			}

		}