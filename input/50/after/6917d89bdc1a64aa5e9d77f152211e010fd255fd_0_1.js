function(data) {
		focusFlyer = "";
		$('#address').html(data);
		$('input#new_location').val('');
		$('#board_link').show();
		$('#map_link').hide();
	}