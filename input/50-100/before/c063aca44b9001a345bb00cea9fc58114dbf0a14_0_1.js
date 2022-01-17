function() {
		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top - 30 + 'px'
		}, {
			duration: 450,
			easing: 'swing'
		});
		return false;
	}