function pageNavStructure() {
	
	var i=0;
	
	html = '<ul id="pageNav">';
	
	if ($("#pageNav > li.active").length > 0) {

		element = $("#pageNav > li.active").html();
	}
	else {
		element = '<a>Ansicht auswählen</a>';
	}
	html+= '<li class="active">' + element + '<ul id="menu">';
	
	$("#pageNav > li").each(function() {
	
		if (!$(this).hasClass('active')) {
						
			html+= '<li>' + $(this).html()  + '</li>';
		}
	});
	
	html += '</li></ul>';

	
	html+= '</ul>';
	$("#pageNav").replaceWith(html);
}