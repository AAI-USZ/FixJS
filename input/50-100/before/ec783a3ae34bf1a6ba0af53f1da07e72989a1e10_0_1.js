function() {
        var arrowEl = $(this).find("h2 span span");
		$(this).next(".accordian-body").slideToggle(400);
		if(arrowEl.html() == "▾") {
			arrowEl.html("&#9656;");
		} else {
			arrowEl.html("&#9662;");
		}
	}