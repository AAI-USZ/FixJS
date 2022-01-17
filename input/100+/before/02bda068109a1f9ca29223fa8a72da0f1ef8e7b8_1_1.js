function(menuBar,screen){
		if ((window.blackberry && blackberry.app.event) && (bb.device.isPlayBook || bb.device.isBB10)) {
			bb.menuBar.createSwipeMenu(menuBar,screen);
			if (bb.device.isPlayBook && !bb.device.isBB10) {
				menuBar.parentNode.removeChild(menuBar);
			}
			document.addEventListener("click", bb.menuBar.globalClickHandler, false);
			blackberry.app.event.onSwipeDown(bb.menuBar.showMenuBar); 
		}else if(window.blackberry && blackberry.ui.menu){
			bb.menuBar.createBlackberryMenu(menuBar);
			menuBar.parentNode.removeChild(menuBar);
		}else{
			console.log('Unable to create Blackberry/onSwipeDown menu.');
		}
	}