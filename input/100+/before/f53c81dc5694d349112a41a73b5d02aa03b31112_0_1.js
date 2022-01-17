function() {

		// Set minimum height so footer will stay at the bottom of the window, even if there isn't enough content
		$('#content').css( 'min-height', $(window).outerHeight(true) - parseInt( $('body').css('border-top-width') ) - $('#header').outerHeight(true) - $('#footer').outerHeight(true) - $('#footer-bottom').outerHeight(true) + 11 );

	}