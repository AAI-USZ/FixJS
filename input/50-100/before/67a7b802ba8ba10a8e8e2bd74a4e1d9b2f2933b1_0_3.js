function() {
	
		if (!$(this).hasClass('active')) {
						
			html+= '<li>' + $(this).html()  + '</li>';
		}
	}