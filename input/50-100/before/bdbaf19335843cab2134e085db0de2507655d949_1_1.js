function showPage(pageName) {
		addToHistory( pageName );
		var $page = $("#" + pageName); 
		if(!$page.hasClass('popup-container-container')) {
			$('.page, .popup-container-container').hide();
			curPageName = pageName;
		}
		$page.show();
	}