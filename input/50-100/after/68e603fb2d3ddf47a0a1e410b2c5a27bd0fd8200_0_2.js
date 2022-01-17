function(type, suffix) {
		// Sometimes have to uncheck the previously checked ones? Later
		$('#' + type + '-preview-pane').find('img').each(function() {
			var thisID = $(this).attr('id');
			var imageID = $(this).attr('data-' + suffix);
			var radio = '#' + thisID + '-' + imageID + '-radio';
			$(radio).prop('checked', true).change();
		});
	}