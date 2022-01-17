function(){
		//clear menus
		if (bb.device.isPlayBook()) {
			//TODO: clear menu
		}
		else{
			console.log('not playbook');
			if(blackberry.ui.menu){
				blackberry.ui.menu.clearMenuItems();
			}
		}
	}