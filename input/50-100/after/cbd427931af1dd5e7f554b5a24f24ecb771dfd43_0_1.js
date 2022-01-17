function() {
			$(this).parent().addClass('todo_' + $(this).attr('branch'));
			addButton(
				$(this).attr('branch'),
				$(this).parent().parent().parent()
			);
		}