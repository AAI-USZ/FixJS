function() {
			return this.filter(function(todo){ return todo.get('completed'); });
		}