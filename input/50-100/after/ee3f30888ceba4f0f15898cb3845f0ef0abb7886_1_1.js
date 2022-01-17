function(e) {
		e.preventDefault();
		$browser = $(this).next();
		$browser.slideToggle();
		if ($browser.height() < 100) {
			$(this).parent().css({height: '550px'});
		} else {
			$(this).parent().css({height: 'auto'});
		}
	}