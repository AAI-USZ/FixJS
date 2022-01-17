function( users, maxUsers, el ) {
		var percentage = users ? users/maxUsers : 0,
        scale = users ? ( 0.5 * users/maxUsers + 1 ) : 1,
        container = el.parent();

		el.css({
			opacity: percentage + 0.5
		});

		container.css({
			"-webkit-transform": "scale( " + scale  + "," + scale + ")"
		});

	}