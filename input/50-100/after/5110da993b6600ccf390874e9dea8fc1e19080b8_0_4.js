function(obj){
		var button = $('<div class="hz_tubeStacks hz_dlButton" aria-label="'+lang.ytdl01+'" data-tooltip="'+lang.ytdl01+'" role="button"><span></span></div>').data('url', $(obj).find('.ot-anchor').attr('href'));
		$(obj).parentsUntil('.ii').next().children().eq(-1).before(button);
	}