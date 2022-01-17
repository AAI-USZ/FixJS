function (pack) {
		if(wolfpacks[pack] == null) {
			var app = new WolfpackPage("__pack__"+pack,pack,applicationFrame);
			menuList.addMenuItem("__pack__"+pack,pack);
			wolfpacks[pack] = app;
		}		
	}