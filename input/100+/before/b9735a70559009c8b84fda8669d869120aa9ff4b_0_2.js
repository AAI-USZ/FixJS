function(options){
		// Set default settings and override with provided ones
		var settings = $.extend({
			considerSpaces:	false,
			resultsList:		$('.jquery-livesearch-results'),
			template:				false,
			noResultsText:	'No results found',
			request: {
				type:			'GET',
				dataType:	'JSON',
				url:			this.parents('form').attr('action'),
				data:			{},
				error:		function(xhr, status, data){ alert(data) }
			}
		}, options)
		
		return this.each(function(){
			new methods().init($(this), settings)
		})
	}