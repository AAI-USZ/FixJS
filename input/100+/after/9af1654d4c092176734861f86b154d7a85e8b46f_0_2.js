function() {
		
		$(this).find(".title").hide();
		if ($(this).find(".title").is(":animated")) {
			$(this).find(".title").stop();
		}
		$(this).find(".title").fadeIn(300);
		if ($(this).find(".playButton").is(":animated")) {
			
			$(this).find(".playButton").stop();
		}
		$(this).find(".playButton").animate({
			
			width: 40,
			height: 40,
			'margin-left': 175,
			'margin-top': 100
		},300);
		$(this).find(".playButton").css("background-image", "url('img/playButtonSmallOver.png')");	
	}