function(event) {
		var layerID = $(this).attr('data-layer');
		var itemID = $(this).attr('data-item');
		var selector = '#layer-' + layerID;

		if (itemID == 0) {
			$('#layer-' + layerID).attr('src', 'images/spacer.gif');
		} else {
			var imageSrc = $(this).parent().find('img').attr('src');
			$(selector).attr('src', imageSrc);
		}
	}