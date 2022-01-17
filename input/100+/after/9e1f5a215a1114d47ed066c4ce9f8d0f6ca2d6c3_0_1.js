function(e) {
		e.preventDefault();
		$browser = $(this).next();
		$browser.slideToggle(function() {
			$(this).trigger('scroll');
		});		
		if ($(this).parents('.block.sidebar').length && $browser.height() < 100) {
			$(this).parent().css({height: '550px'});
		} else if ($(this).parents('.block.sidebar').length) {
			$(this).parent().css({height: 'auto'});
		}
	}