function(){
		$(this).removeClass("number_link_disable").addClass("number_link_enable");
		$(this).children().removeClass("enabled").addClass("disabled");
		$(this).parent().siblings().removeClass("img_enabled").addClass("img_disabled");
 		$.get('disable/'+this.id);
	}