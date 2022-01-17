function(e) {
		
		e.preventDefault();
		
		if ($(this).find("ul").is(":visible")) {
			
			$(this).find("ul").slideUp();
		}
		else {
				
			$(this).find("ul").slideDown();
		}
	}