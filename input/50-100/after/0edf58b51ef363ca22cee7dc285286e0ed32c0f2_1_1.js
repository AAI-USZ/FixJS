function (bookmark) {
		// save the restore state
		app.restoreState = app.getState();
		
        console.log(bookmark.name);
		app.loadState(bookmark.state);

		// show the alert for resting state
		app.viewModel.error("restoreState");
		$('#bookmark-popover').hide();

	}