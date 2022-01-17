function(val) {

		var settings = $(this).data('settings');
		var tagslist = $(this).val().split(settings.delimiter);		
		return (jQuery.inArray(val, tagslist) >= 0); //true when tag exists, false when not
	}