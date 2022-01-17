function(clicked) {
		var layersPane = $(clicked).parent().parent().parent();
		// First remove the bg2 class from everything
		layersPane.find('.bg2').removeClass('bg2');
		$(clicked).parent().addClass('bg2');
		layersPane.prev().find('div').hide();
		$($(clicked).attr('href')).show();
	}