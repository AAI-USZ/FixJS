function switchFilter( filterName ){
		$('#filters li a')
			.removeClass('selected')
			.filter("[href='#/" + (filterName || "") + "']")
			.addClass('selected');
	}