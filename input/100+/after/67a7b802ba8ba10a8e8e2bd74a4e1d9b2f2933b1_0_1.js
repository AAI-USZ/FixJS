function(e) {
		
		e.preventDefault();
		
		if ($(this).parent().find("ul").is(":visible") && !$(this).parent().find("ul").is(":animated")) {
			
			$(this).parent().find("ul").slideUp();
		}
		if ($(this).parent().find("ul").is(":hidden") && !$(this).parent().find("ul").is(":animated")) {
				
			$(this).parent().find("ul").slideDown();
		}
	}