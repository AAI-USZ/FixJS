function() {
		var o = $char_opacity.val();
		$char_opacity_size.html( o + '%' );
		$oldbusted.css({'opacity': o / 100});
	}