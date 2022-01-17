function processScroll() {
		var scrollTop = $(window).scrollTop();
		if (!isFixed && scrollTop >= topOffset) {
			isFixed = true;
			$toFix.addClass('fixed');
		} else if (isFixed && scrollTop <= topOffset) {
			isFixed = false;
			$toFix.removeClass('fixed');
		}
	}