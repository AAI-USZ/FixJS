function hideResolved() {
		// hide all those entries where nothing has to be done
		$('tr').addClass('nothingToDo').show();

		$('.info-planned').each(function() {
			$(this).parent().removeClass('nothingToDo');
		});
		$('tr.nothingToDo').hide();
		$('tbody tr:first').show();
	}