function(filterOn) {
		if (filterOn == true) {
			$('.over18').hide();
			if ($('#nsfwstyle').length == 0) {
				$('body').append('<style id="nsfwstyle" />')
			}
			$('#nsfwstyle').html('.over18 { display: none; }');
		} else {
			$('.over18').show();
			if ($('#nsfwstyle').length == 0) {
				$('body').append('<style id="nsfwstyle" />')
			}
			$('#nsfwstyle').html('.over18 { display: block; }');
		}
	}