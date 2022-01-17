function(e) {
		var state = $bg.prop('checked');
		$artboard.css('background', state ? '#34c429' : '');
		$canvas.css('background', state ? '#34c429' : '');
	}