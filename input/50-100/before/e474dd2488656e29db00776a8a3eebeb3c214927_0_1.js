function(e) {
			e.preventDefault();
			if($(this).hasClass("resized")) {
				$(this).removeClass("resized");
				$(this).parent().find("img").css("width","");
			} else {
				$(this).addClass("resized").parent().find("img").css("width","100%");
			}
			return false;
		}