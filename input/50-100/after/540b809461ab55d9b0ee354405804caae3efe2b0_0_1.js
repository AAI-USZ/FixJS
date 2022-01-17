function lab_change_menu(id) {
	var active = $('#lab-nav-list').find('.active');
	active.removeClass('active').addClass('hide');
	active.next().removeClass('hide');

	var current = $('#' + id).find('.hide');
	current.removeClass('hide').addClass('active');
	current.next().addClass('hide');
    }