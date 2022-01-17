function(){
		if(window.blackberry){
			if(bb.menuBar.menu && (bb.device.isPlayBook || bb.device.isBB10) && blackberry.app.event){
				blackberry.app.event.onSwipeDown('');
				bb.menuBar.menu.parentNode.removeChild(bb.menuBar.menu);
				bb.menuBar.menu = false;
				bb.menuBar.menuOpen = false;
			}else if(blackberry.ui && blackberry.ui.menu){
				blackberry.ui.menu.clearMenuItems();
			}
		}
	}