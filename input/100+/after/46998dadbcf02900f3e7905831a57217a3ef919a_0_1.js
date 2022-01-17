function() {
		
		
		$(".page > li").each(function() {

			if ($(this).css("opacity") == "0.5") {
				
				$(this).animate({
					
					opacity: 1
				}, function() {

					addDraggableToItems($(this));
					$(this).addClass("item");
				});
			}
		});
		$(".playList ul > li").each(function() {
			
			$(this).fadeOut(300, function() {
				
				$(this).remove();
			});
		});
		set_cookie("playlist","");
		
		$(".playList .info").delay(300).fadeIn(300);
	}