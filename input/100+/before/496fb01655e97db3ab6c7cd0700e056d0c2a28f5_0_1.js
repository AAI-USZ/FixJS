function pageNavStructure() {
	
	var i=0;
	
	html = '<ul id="pageNav">';
	html+= '<li class="active">' + $("#pageNav > li.active").html() + '<ul id="menu">';
	
	$("#pageNav > li").each(function() {
	
		if (!$(this).hasClass('active')) {
						
			html+= '<li>' + $(this).html()  + '</li>';
		}
	});
	
	html += '</li></ul>';

	
	html+= '</ul>';
	$("#pageNav").replaceWith(html);
}