function(layerID) {
		// First remove the bg2 class from everything
		$('#layers-pane').find('.bg2').removeClass('bg2');
		$('#layers-pane a[data-layer="' + layerID + '"]').parent().addClass('bg2');
		$('#inventory-pane div').hide();
		$('#layer-' + layerID + '-anchor').show();
	}