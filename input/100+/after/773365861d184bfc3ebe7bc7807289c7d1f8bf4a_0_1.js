function(e) {
		e.preventDefault();
		var chosen = $(this).attr('name');
        $('a.show_table').removeClass('current');
		$('#link_' + chosen).addClass('current');
		
		$('.tbl_invalid_users').hide();
		$('#invalid_users_' + chosen).show();
	}