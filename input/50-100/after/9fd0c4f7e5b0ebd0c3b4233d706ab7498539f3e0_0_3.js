function(param){

			currentFilter = param;
			Todos.trigger('reset');

			// Currently not working on navigation.
			$('#filters li a')
				.removeClass('selected')
				.filter("[href='#/" + param + "']")
				.addClass('selected');


		}