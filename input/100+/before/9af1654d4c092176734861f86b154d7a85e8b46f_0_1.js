function() {
		
		$(this).find(".title").fadeOut(300);
		$(this).find(".playButton").animate({
			
			width: 75,
			height: 75,
			'margin-left': 73,
			'margin-top': 37
		},300);
		
		$(this).find(".playButton").css("background-image", "url('img/playButton.png')");	
	}