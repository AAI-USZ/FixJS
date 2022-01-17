function( users, maxUsers, el ) {
		var percentage = users/maxUsers;
		el.css({
			"-webkit-transform": "scale( " + percentage + "," + percentage  + ")",
			opacity: percentage
		});
	}