function open_box(elem) {
	
	if (($(elem).parent().hasClass("page") || $(elem).parent()[0].tagName == "BODY") && !$(".overlay").is(":visible")) {
	
		$(elem).addClass("open");
		$(elem).css("z-index","550");
		$(elem).find(".images").css("z-index","600");
		$(elem).find(".box").css("z-index","650");
		
		$(elem).find(".images").delay(300).animate({
				
			height: '510',
			top: '-180px',
			opacity: 1
		},500);
		$(elem).find(".info").delay(300).animate({
			
			width: '400',
			opacity: 1
		},500);
		
		left_calc = 0;
		top_calc = 0;
		
		position_left = ($(elem).offset().left-10 - ($(window).width()-$("#gridContent .wrapper").width())/2)/240;
		position_top = ($(elem).offset().top-10 - $(".is_shown").offset().top)/170;
		
		switch (position_top) {
			
			case 0:
			
				top_calc+= 170;
				break;
			case 1:
			
				top_calc+= 0;
				break;
			case 2:
				
				top_calc-= 170;
				break;
		}
		
		switch (position_left) {
			
			case 0:
			
				left_calc+= 240;
				break;
			case 1:
			
				left_calc+= 0;
				break;
			case 2:
				
				left_calc-= 240;
				break;
			case 3:
			
				left_calc-= 240+240;
				break;
		}
		
		$(elem).animate({
			left: left_calc,
			top: top_calc
		});
		$(".overlay").fadeIn(300);
	}
}