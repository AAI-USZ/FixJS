function (url, id) {
        // Remove our old screen
        bb.removeLoadedScripts();
		bb.menuBar.clearMenu();
        var numItems = bb.screens.length,
			currentScreen;
        if (numItems > 0) {
			bb.clearScrollers();
			// Quirk with displaying with animations
			if (bb.device.isBB5 || bb.device.isBB6 || bb.device.isBB7) {
				currentScreen = document.getElementById(bb.screens[numItems -1].id);
				currentScreen.style.display = 'none';
				window.scroll(0,0);
			}
        }
		
        // Add our screen to the stack
        var container = bb.loadScreen(url, id, false);
		bb.screens.push({'id' : id, 'url' : url, 'scripts' : container.scriptIds});    
    }