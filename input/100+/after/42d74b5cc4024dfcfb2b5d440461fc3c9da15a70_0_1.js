function() {

        var numItems = bb.screens.length;
        if (numItems > 1) {
            bb.removeLoadedScripts();
			bb.clearScrollers();
            var currentStackItem = bb.screens[numItems-1],
                current = document.getElementById(currentStackItem.id);
            document.body.removeChild(current);
            bb.screens.pop();
		    bb.menuBar.clearMenu();
			bb.screen.overlay = null;
			bb.screen.tabOverlay = null;

            // Retrieve our new screen
            var display = bb.screens[numItems-2],
                container = bb.loadScreen(display.url, display.id);
				
            window.scroll(0,0);
            bb.screen.applyEffect(display.id, container);

        } else {
            if (blackberry) {
                blackberry.app.exit();
            }
        }
    }