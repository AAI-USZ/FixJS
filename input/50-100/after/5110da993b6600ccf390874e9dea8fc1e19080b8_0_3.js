function(obj, url){
		var button = $('<div class="hz_in-albumDownload hz_button blue" role="button">'+lang.fs03+'</div>').data('url', url);
		obj.data('class', true).next().find('.Rqa').children().eq(1).before(button);
	}