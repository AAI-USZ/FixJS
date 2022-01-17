function() {
		
		$(this).find(".title").show();
		if ($(this).find(".title").is(":animated")) {
			$(this).find(".title").stop();
		}
		$(this).find(".title").fadeOut(300);
		if ($(this).find(".playButton").is(":animated")) {
			
			$(this).find(".playButton").stop();
		}
		$(this).find(".playButton").animate({
			
			width: 75,
			height: 75,
			'margin-left': 73,
			'margin-top': 37
		},300);
		
		$(this).find(".playButton").css("background-image", "url('img/playButton.png')");	
	}