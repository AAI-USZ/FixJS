function() {
		
		if ($(this).find(".info").is(":animated")) {
			
			$(this).find(".info").stop();
		}
		$(this).find(".info").animate({
			
			width: '220'
		});
	}