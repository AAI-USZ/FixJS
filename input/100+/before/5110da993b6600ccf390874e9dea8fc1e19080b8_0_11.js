function(){
		var page = location.href.replace(/\?(.*)/, '');

		if (page.match(/\/photos\/\w+\/albums\/\w+/)){
			var $nav = $('nav:visible');
			if (!$nav.data('class')){
				P.album_page($nav, page);
			}
		} else {
			$(selectors[8]).each(function(){
				if (!$(this).data('class')){
					P.album_post(this);
					$(this).data('class', true);
				}
			});
		}
	}