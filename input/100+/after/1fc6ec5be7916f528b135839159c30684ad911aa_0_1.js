function add_task(e) {
	e.preventDefault();
	$(this).closest('.tasklist').children('ul').prepend(
		$('<li />').append(
			$('<div />').addClass('task').append(
				$('<a>&nbsp;</a>').addClass('checkbox')
			).append(
				$('<a href="#" />').addClass('delete control').html('&#xd7;').click(delete_task)
			).append(
				$('<a href="#" />').addClass('notetoggle control').html('+').click(toggle_notes)
			).append(
				$('<span />').addClass('tasktitle').make_editable().click()
			)
		)
	);
}