function(obj){
		var url = obj.href;
		if (url.match(/\/photos\/\w+\/albums\/\w+/)){
			var button = $('<div class="hz_albumDownload hz_dlButton" aria-label="'+lang.al01+'" data-tooltip="'+lang.al01+'" role="button"><span></span></div>').data('url', url);
			$(obj).parentsUntil('.ii').next().children().eq(-1).before(button);
		}
	}