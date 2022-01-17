function pageNavStructure() {
	
	var i=0;
	
	console.log($("#pageNav").html());
	
	html = '<ul id="pageNav">';
	html+= '<li class="active">' + $("#pageNav > li.active").html() + '<ul id="menu">';
	
	$("#pageNav > li").each(function() {
	
		if (!$(this).hasClass('active')) {
						
			html+= '<li>' + $(this).html()  + '</li>';
		}
	});
	
	html += '</li></ul>';

	
	html+= '</ul>';
	console.log(html);
	$("#pageNav").replaceWith(html);
}