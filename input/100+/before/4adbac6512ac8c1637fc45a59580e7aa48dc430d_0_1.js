function toolbarPos() {
	var $=jQuery;
	if ($('#toolbar section').length) {
		if ($(document).width() <= 1100) {
			if (!$('#container').hasClass('no-resize')) {
				$('#container').addClass('toolbar-margin');
			}
			$('#toolbar').css({'position': 'absolute', 'left': $('#wrapper').offset().left + $('#wrapper').outerWidth() + 7, 'top' : $(document).scrollTop() + 136, 'display': 'block'});
			console.log($('#toolbar').css('top'));
		} else {
			$('#container').removeClass('toolbar-margin');
			$('#toolbar').css({'position': 'fixed', 'left': $('#wrapper').offset().left + $('#wrapper').outerWidth() + 7, 'top': 136, 'display': 'block'});
		}
	}
}