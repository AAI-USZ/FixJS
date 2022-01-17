function() {
		
		var li = $(this);
		
		$(this).addClass("has_focus");
		
		setTimeout(function(){
				
		  if ($(li).hasClass("has_focus")) {
			   
			   if (!$(li).find("ul").is(":animated")) {
				   
					$(li).find("ul").slideDown(300);
			   }
		  }
		}, 500);
	}