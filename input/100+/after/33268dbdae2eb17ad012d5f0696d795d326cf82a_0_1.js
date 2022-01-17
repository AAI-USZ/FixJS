function() {
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
	}