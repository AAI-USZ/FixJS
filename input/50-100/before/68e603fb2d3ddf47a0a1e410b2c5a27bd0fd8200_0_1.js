function() {
			var thisID = $(this).attr('id');
			var imageID = $(this).attr('data-' + suffix);
			var radio = '#' + thisID + '-' + imageID + '-radio';
			$(radio).attr('checked', 'true').change();
		}