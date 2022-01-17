function() {
	// Abstractified so it can be used by both "restore" buttons
	var restoreLayers = function(type, suffix) {
		// Sometimes have to uncheck the previously checked ones? Later
		$('#' + type + '-preview-pane').find('img').each(function() {
			var thisID = $(this).attr('id');
			var imageID = $(this).attr('data-' + suffix);
			var radio = '#' + thisID + '-' + imageID + '-radio';
			$(radio).prop('checked', true).change();
		});
	};

	// Click an image, and it will change it in the demo
	$('.item-button').change(function(event) {
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
	});

	// Restore all the original/default items
	$('input[type="reset"]').click(function() {
		restoreLayers($(this).attr('data-type'), $(this).attr('data-suffix'));
	});

	// Helper function for only showing things in the current layer
	var showOnlyLayer = function(clicked) {
		var layersPane = $(clicked).parent().parent().parent();
		// First remove the bg2 class from everything
		layersPane.find('.bg2').removeClass('bg2');
		$(clicked).parent().addClass('bg2');
		layersPane.prev().find('div').hide();
		$($(clicked).attr('href')).show();
	};

	// Hide all the items except those in the current layer
	showOnlyLayer($('#inventory-layers-pane a:first-child'));
	showOnlyLayer($('#shop-layers-pane a:first-child'));

	$('.layers-pane a').click(function() {
		showOnlyLayer(this);
		return false;
	});
}