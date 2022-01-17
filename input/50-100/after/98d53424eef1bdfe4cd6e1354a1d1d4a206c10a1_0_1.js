function( users, maxUsers, el ) {
		var percentage = users ? users/maxUsers : 0.5,
        scale = users ? ( .25 * users/maxUsers + 1 ) : 1,
        container = el.parent();

		el.css({
			opacity: percentage
		});

		container.css({
			"-webkit-transform": "scale( " + scale  + "," + scale + ")"
		});

	}