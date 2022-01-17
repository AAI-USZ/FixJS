function hideResolved(table) {
		// hide all those entries where nothing has to be done
		table.find('tr').addClass('nothingToDo').show();

		table.find('.info-planned').each(function() {
			$(this).parent().removeClass('nothingToDo');
		});

		table.find('tr.nothingToDo').hide();
		table.find('tbody tr:first').show();
	}