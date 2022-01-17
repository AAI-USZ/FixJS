function() {
		$('#sidebar').resizable('option', 'maxWidth', $('#content').width());
		
		$('#builder').css({"overflow-y":"auto"});
		$('#builder').height($(window).height()-$('#header').height()-$('#footer').height());		
		$('#sidebar').height($('#builder').height());
	}