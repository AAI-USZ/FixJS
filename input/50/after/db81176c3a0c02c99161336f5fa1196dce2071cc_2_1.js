function(param){

			// Set the current filter to be used
			window.app.TodoFilter = param.trim() || "";

			// Trigger a collection reset/addAll
			window.app.Todos.trigger('reset');
		}