function() {

        var numItems = bb.screens.length;
        if (numItems > 1) {
            bb.removeLoadedScripts();
			bb.clearScrollers();
			bb.removeTopMostScreenFromDom();
		    bb.menuBar.clearMenu();
			bb.screen.overlay = null;
			bb.screen.tabOverlay = null;

            // Retrieve our new screen
            var display = bb.screens[numItems-2],
                container = bb.loadScreen(display.url, display.id, true);
				
			bb.screens.pop();	
			
            // Quirky BrowserField2 bug on BBOS
			if (bb.device.isBB5 || bb.device.isBB6 || bb.device.isBB7) {
				window.scroll(0,0);
			}
        } else {
            if (blackberry) {
                blackberry.app.exit();
            }
        }
    }