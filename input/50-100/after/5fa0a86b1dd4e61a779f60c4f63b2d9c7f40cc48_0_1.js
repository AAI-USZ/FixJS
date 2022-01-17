function(){
		var path = $(this).attr('href').split('?');
		var uri = path[0] + '?overlay=true';

		if (path.length > 1) {
			var uri = uri + '&' + path[1];
		}

		$('#overlay').load(uri, function(){ $('#overlay textarea').likeaboss(); $('#overlay').overlay(); });
		return false;
	}