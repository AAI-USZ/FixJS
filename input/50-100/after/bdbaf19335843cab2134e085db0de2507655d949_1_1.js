function showPage(pageName) {
		addToHistory( pageName );
		var $page = $("#" + pageName); 
		$('.page, .popup-container-container').hide(); // hide existing popups
		if(!$page.hasClass('popup-container-container')) {
			curPageName = pageName;
		}
		$page.show();
	}