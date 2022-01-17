function( users, maxUsers, el ) {
		var percentage = users ? users/maxUsers : 0.5,
            scale = users ? (percentage + "," + percentage) : '1,1';
		el.css({
			"-webkit-transform": "scale( " + scale  + ")",
			opacity: percentage
		});
	}