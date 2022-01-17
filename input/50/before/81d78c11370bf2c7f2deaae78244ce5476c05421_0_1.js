function (bookmark) {
    
        app.saveStateMode = false;
		app.loadState(bookmark.state);

		// show the alert for resting state
		app.viewModel.error("restoreState");
		$('#bookmark-popover').hide();
        
	}