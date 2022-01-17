function( $ ) {
	$('a[href^="#"]').SmoothScroll({
		duration : 1000,
		easing : 'easeOutQuint'
	});
	/*
	$('a[href^="#"]').live( 'hover', function() {
		$(this).SmoothScroll({
			duration : 1000,
			easing : 'easeOutQuint'
		});
	});
	*/
}