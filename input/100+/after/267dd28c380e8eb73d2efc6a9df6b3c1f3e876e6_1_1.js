function routeTo(href) {
	var goto = (href.indexOf("http") == 0) ? href.substr(19).toLowerCase() : href;
	var offset = 110;
	if($("#" + goto).length)
		$("#home").css({height: "680px"});
	if(goto == "talks" || goto == "sprints" || goto == "workshops") {
		$("#"+goto).click();
	}
	else {
		var to = $("#" + goto);
		if($(to).hasClass("goto")) {
			$.scrollTo($(to).position().top + offset, {duration:500});
		}
	}
}