function(){
		if(window.blackberry){
			if(bb.menuBar.menu && (bb.device.isPlayBook || bb.device.isBB10) && blackberry.app.event){
				blackberry.app.event.onSwipeDown('');
				document.removeEventListener("click", bb.menuBar.globalClickHandler, false);
				bb.menuBar.menu.parentNode.removeChild(bb.menuBar.menu);
				bb.menuBar.menu = false;
			}else if(blackberry.ui && blackberry.ui.menu){
				blackberry.ui.menu.clearMenuItems();
			}
		}
	}