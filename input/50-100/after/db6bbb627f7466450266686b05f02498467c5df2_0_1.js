function goBack() {
		var pageName;
		if( pageHistory.length > 1 ) {
			pageName = pageHistory.pop(); // this is the current page
			pageName = pageHistory.pop(); // this is the previous page
			showPage( pageName );
		} else {
			console.log( 'Nothing in pageHistory to go back to. Quitting :(' );
			navigator.app.exitApp();
		}
	}