function() {

	$('.show_table').click(function(e) {
		e.preventDefault();
		var chosen = $(this).attr('name');
        $('a.show_table').removeClass('current');
		$('#link_' + chosen).addClass('current');
		
		$('.tbl_invalid_users').hide();
		$('#invalid_users_' + chosen).show();
	});
	
	$('.update_user').click(function(e) {
		e.preventDefault();
		$('table td').css('background-color','#FFF');
		$(e.currentTarget).closest('tr').children().css('background-color','#FBF586');
		var link_href = this.href;
		$.colorbox({href:link_href});
		
	});
	
	// Add colour to searched user
	$('a.lookup').click(function(e) {
		$('table td').css('background-color','#FFF');
		$(e.currentTarget).closest('tr').children().css('background-color','#FBF586');
	});
	
}