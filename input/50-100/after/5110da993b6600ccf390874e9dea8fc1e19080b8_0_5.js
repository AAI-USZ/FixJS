function(){
		if (!$(this).data('class')){
			P.album_page($('.kI:visible'), location.href.replace(/\?(.*)/, ''));
			$(this).data('class', true);
		}
	}