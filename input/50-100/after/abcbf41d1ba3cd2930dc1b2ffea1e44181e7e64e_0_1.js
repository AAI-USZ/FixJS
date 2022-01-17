function (pack) {
		if(wolfpacks[pack] == null) {		
			if(pack != "wall-readers") {
				menuList.addMenuItem("__pack__"+pack,pack);
			}
			
			var app = new WolfpackPage("__pack__"+pack,pack,applicationFrame);
			
			
			wolfpacks[pack] = app;
		}		
	}