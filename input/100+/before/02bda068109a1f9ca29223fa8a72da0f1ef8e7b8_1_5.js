function(){
		if(bb.menuBar.menuOpen){
			bb.menuBar.menu.overlay.style.display = 'none';
			blackberry.app.event.onSwipeDown(bb.menuBar.showMenuBar);
			bb.menuBar.menu.style['-webkit-transition'] = 'all 0.5s ease-in-out';
			bb.menuBar.menu.style['-webkit-transform'] = 'translate(0, -' + (bb.menuBar.height + 3) + 'px)';
			bb.menuBar.menuOpen = false;
		}
	}