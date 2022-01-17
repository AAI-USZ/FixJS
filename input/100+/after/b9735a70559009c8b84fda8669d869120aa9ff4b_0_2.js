function(options){
		// Set the default request and extend with options (if provided)
		// We do this here in order to avoid overwriting the entire object from options
		var request = $.extend({
			type:			'GET',
			dataType:	'JSON',
			url:			this.parents('form').attr('action'),
			data:			{},
			success:	function(data, status, xhr){},
			error:		function(xhr, status, data){ alert(status) }
		}, options ? options.request : undefined)
		
		// Set default settings and override with provided ones (except the request object)
		var settings = $.extend({
			considerSpaces:	false,
			resultsList:		$('.jquery-livesearch-results'),
			template:				false,
			noResultsText:	'No results found'
		}, options)
		
		// Overwrite the overwriting request object here (if provided by options), with our nicely merged one
		settings.request = request
		
		return this.each(function(){
			new methods().init($(this), settings)
		})
	}