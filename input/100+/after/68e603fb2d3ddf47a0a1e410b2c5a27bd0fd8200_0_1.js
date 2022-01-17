function(event) {
		var layerID = $(this).attr('data-layer');
		var itemID = $(this).attr('data-item');
		var type = $(this).attr('data-type');
		var selector = '#' + type + '-layer-' + layerID;

		if (itemID == 0) {
			$(selector).attr('src', 'images/spacer.gif');
		} else {
			var imageSrc = $(this).parent().find('img').attr('src');
			$(selector).attr('src', imageSrc);
		}
	}