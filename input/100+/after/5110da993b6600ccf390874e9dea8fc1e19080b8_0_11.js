function(){
		var page = location.href.replace(/\?(.*)/, '');

		if (page.match(/\/photos\/\w+\/albums\/\w+/)){
			var $nav = $('.kI:visible');
			if (!$nav.data('class')){
				P.album_page($nav, page);
			}
		} else {
			$('.pc').each(function(){
				if (!$(this).data('class')){
					P.album_post(this);
					$(this).data('class', true);
				}
			});
		}
	}