function() {
	var SIDEBAR_SHOWN = true;
	$('.toggle-sidebar').click(function() {
		if (SIDEBAR_SHOWN === true) {
			SIDEBAR_SHOWN = false;
			$('.articles').addClass('width-max');
			$('.toggle-sidebar span').html('<<');
			$('.sidebar').removeClass('open');
			$('.sidebar').addClass('close');
			$('.sidebar-content').hide();
		}
		else {
			SIDEBAR_SHOWN = true;
			$('.articles').removeClass('width-max');
			$('.toggle-sidebar span').html('>>');
			$('.sidebar').removeClass('close');
			$('.sidebar').addClass('open');
			$('.sidebar-content').show();
		}
	});
	$('.light-switch').click(function() {
		$('body, nav, aside, .toggle-sidebar, .main-content, footer.main.')
			.toggleClass('night-mode');
	});

	$('.fuzz-finder').keypress(function(e) {
		if (e.charCode === 13) {
			var inputText = $(this).val().replace(/ /g, '+');
			location.href = '/search/' + inputText + '/';
		}
	});
	$('.fuzz-finder-go').click(function() {
		var inputText = $('.fuzz-finder').val().replace(/ /g, '+');
		if (inputText !== '') {
			location.href = '/search/' + inputText + '/';
		}
	});
}