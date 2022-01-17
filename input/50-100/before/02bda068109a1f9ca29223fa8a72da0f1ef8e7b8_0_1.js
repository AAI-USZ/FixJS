function(){
		if (bb.menuBar.menuOpen && !bb.menuBar.activeClick && !bb.menuBar.ignoreClick) {
			bb.menuBar.hideMenuBar();
		}
		bb.menuBar.activeClick = false;
		bb.menuBar.ignoreClick = false;
	}