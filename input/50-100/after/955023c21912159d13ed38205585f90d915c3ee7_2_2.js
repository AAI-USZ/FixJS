function() {
		$('section>div').css({"overflow-y":"auto"});
		$('section>div').height($(window).height()-$('#header').height()-$('#footer').height()-106);
		$('aside').height($('section>div').height());
	}