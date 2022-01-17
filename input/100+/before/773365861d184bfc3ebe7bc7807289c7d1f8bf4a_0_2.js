function() {

	jQuery('.show_table').click(function(e) {
	
		e.preventDefault();
		var chosen = this.name;
		//var chosen_link_class = this.class;
		
		jQuery('#invalid_users_1').hide();
		jQuery('#invalid_users_2').hide();
		jQuery('#invalid_users_3').hide();
		jQuery('#invalid_users_4').hide();
		jQuery('#invalid_users_5').hide();
		jQuery('#invalid_users_6').hide();
		jQuery('#invalid_users_7').hide();
		
		jQuery('#invalid_users_' + chosen).show();
		
		jQuery('#link_1').attr('class', 'show_table');
		jQuery('#link_2').attr('class', 'show_table');
		jQuery('#link_3').attr('class', 'show_table');
		jQuery('#link_4').attr('class', 'show_table');
		jQuery('#link_5').attr('class', 'show_table');
		jQuery('#link_6').attr('class', 'show_table');
		jQuery('#link_7').attr('class', 'show_table');
		jQuery('#link_' + chosen).attr('class', 'show_table current');
		
	});
	
	jQuery('.update_user').click(function(e) {
		e.preventDefault();
		jQuery('table td').css('background-color','#FFF');
		jQuery(e.currentTarget).closest('tr').children().css('background-color','#FBF586');
		var link_href = this.href;
		jQuery.colorbox({href:link_href});
		
	});
	
	// Add colour to searched user
	jQuery('a.lookup').click(function(e) {
		jQuery('table td').css('background-color','#FFF');
		jQuery(e.currentTarget).closest('tr').children().css('background-color','#FBF586');
	});
	
}