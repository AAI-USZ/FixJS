function() {

		// Images
		$('.single-image, .image-gallery').fancybox({
			'transitionIn'  : 'fade',
			'transitionOut' : 'fade',
			'titlePosition' : 'over'
		}).each(function() {
			$(this).append('<span class="zoom">&nbsp;</span>');
		});

		// Iframe
		$('.iframe').fancybox({
			'autoScale'     : false,
			'transitionIn'  : 'fade',
			'transitionOut' : 'fade',
			'type'          : 'iframe',
			'titleShow'     : false
		}).each(function() {
			$(this).append('<span class="zoom">&nbsp;</span>');
		});

	}