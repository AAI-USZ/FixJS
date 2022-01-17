function() {
	// Abstractified so it can be used by both "restore" buttons
	var restoreLayers = function(suffix) {
		$('#preview-pane').find('img').each(function() {
			var thisID = $(this).attr('id');
			var imageID = $(this).attr('data-' + suffix);
			var radio = '#' + thisID + '-' + imageID + '-radio';
			$(radio).attr('checked', 'true').change();
		});
	};

	// Click an image, and it will change it in the demo
	$('.item-button').change(function(event) {
		var layerID = $(this).attr('data-layer');
		var itemID = $(this).attr('data-item');
		var selector = '#layer-' + layerID;

		if (itemID == 0) {
			$('#layer-' + layerID).attr('src', 'images/spacer.gif');
		} else {
			var imageSrc = $(this).parent().find('img').attr('src');
			$(selector).attr('src', imageSrc);
		}
	});

	// Restore all the original/default items
	$('input[type="reset"]').click(function() {
		restoreLayers($(this).attr('data-suffix'));
	});

	// Helper function for only showing things in the current layer
	var showOnlyLayer = function(layerID) {
		// First remove the bg2 class from everything
		$('#layers-pane').find('.bg2').removeClass('bg2');
		$('#layers-pane a[data-layer="' + layerID + '"]').parent().addClass('bg2');
		$('#inventory-pane div').hide();
		$('#layer-' + layerID + '-anchor').show();
	};

	// Hide all the items except those in the current layer
	var currentLayer = $('#layers-pane a:first-child').attr('data-layer');
	showOnlyLayer(currentLayer);

	$('#layers-pane a').click(function() {
		showOnlyLayer($(this).attr('data-layer'));
		return false;
	});
}