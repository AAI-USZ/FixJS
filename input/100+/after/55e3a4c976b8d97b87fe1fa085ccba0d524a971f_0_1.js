function() {
	
	// scroll to the tasklist passed in the URL and given the 'start' class
	if ($('.tasklist.start').length) {
		var index = $('.tasklist.start').index('.tasklist');
		$('.tasklists').css('left', -index * $('.tasklist-view').width() + 'px');
	}
	
	refresh_view();
	
	// animate horizontal paging between lists
	$('.tasknav a').click(false).click(function() {
		var oper = $(this).hasClass('next') ? '-=' : '+=';
		$('.tasklists').animate({left: oper + $('.tasklist-view').width() + 'px'}, 250, refresh_view);
	});
	
	// edit task titles and notes
	$('.tasktitle, .tasknotes').make_editable();
	
	// reset check boxes in case of page reload
	$('.task.completed input:checkbox').prop('checked', true);
	$('.task:not(".completed") input:checkbox').prop('checked', false);
	
	// check boxes
	$('.task input:checkbox').change(toggle_checkboxes);

	// add task
	$('.tasklist .add').click(add_task);

	// delete task
	$('.task .delete').click(delete_task);
	
	// show/hide/create notes
	$('.task .notetoggle').click(toggle_notes);
	
	// sort list
	$('.tasklists > .tasklist > ul').nestedSortable({
		listType: 'ul',
		items: 'li',
		toleranceElement: '> div',
		handle: '> div',
	}).bind('sortupdate', update_sort_order);

}