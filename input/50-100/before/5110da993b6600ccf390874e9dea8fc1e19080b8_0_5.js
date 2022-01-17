function(){
		if (!$(this).data('class')){
			P.album_page($('nav:visible'), location.href.replace(/\?(.*)/, ''));
			$(this).data('class', true);
		}
	}