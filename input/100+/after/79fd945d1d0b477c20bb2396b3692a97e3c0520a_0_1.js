function(){
	    console.debug("clicked on disabled");
		$(this).removeClass("number_link_disable").addClass("number_link_enable");
		$(this).children().removeClass("enabled").addClass("disabled");
		console.debug($(this).parent().siblings());
		$(this).parent().siblings().children().removeClass("img_enabled").addClass("img_disabled");
 		$.get('disable/'+this.id);
	}