function(){
		if(blackberry && blackberry.ui && blackberry.ui.menu){
			//clear menus
			if (bb.device.isPlayBook()) {
				//TODO: clear PB menu
			}
			else{
				if(blackberry.ui.menu){
					blackberry.ui.menu.clearMenuItems();
				}
			}
		}
	}