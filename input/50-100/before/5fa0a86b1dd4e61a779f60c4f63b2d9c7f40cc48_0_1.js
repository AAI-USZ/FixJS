function(){
		var path = $(this).attr('href').split('?');

		if (path.length > 1) {
			var uri = path[0] + '?overlay=true&' + path[1];
		} else {
			var uri = path[0];
		}

		$('#overlay').load(uri, function(){ $('#overlay textarea').likeaboss(); $('#overlay').overlay(); });
		return false;
	}