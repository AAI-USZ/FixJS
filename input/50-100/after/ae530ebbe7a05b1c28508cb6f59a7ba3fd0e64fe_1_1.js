function() {
		var height = 0;

		// Go over all playerContainer direct children with .block class
		$('#playerContainer > .block').each(function() {
			height += $( this ).outerHeight( true );
		});

		// If we're in vertical playlist mode, and not in fullscreen add playlist height
		if( $('#container').hasClass('vertical') && ! $('#container').hasClass('fullscreen') && this.displayPlayer ) {
			height += $('#playlistContainer').outerHeight( true );
		}

		return height;
	}