function(controllers, isRefreshSinglePage, animate) {
		//set default language
		CB.Util.setDefaultLang(CB.DefaultLang);
		
		//init the debug mode
		CB.Debug.init(CB.DebugMode.sys);
		
		//init the models
		CB.DB.models.initialize();

		if (isRefreshSinglePage) {
			//just referesh a page(view)
			var currController = CB.stackOfControllers[CB.stackOfControllers.length - 1];
			if (controllers !== 'home' && currController != undefined) {
				CB.mainView.remove(currController.view);
				currController = null;
			}
			CB.stackOfControllers[controllers] = null;
			CB.stackOfControllers.pop();

			controllers = [controllers];
			CB.includeControllers(controllers);
			CB.pushController(CB.controllers[controllers], animate);
		} else {
			if (controllers !== null && controllers !== undefined) {
				__controllers = controllers;
			}

			//reload all pages and return home page
			for (var i = 0, l = CB.stackOfControllers.length; i < l; i++) {
				if (CB.stackOfControllers[i] != undefined) {
					CB.mainView.remove(CB.stackOfControllers[i].view);
					CB.stackOfControllers[i] = null;
					CB.stackOfControllers.pop();
				}
			}
			CB.controllers = [];

			CB.includeControllers(__controllers);
			CB.setRootController(CB.RootController, animate);
			CB.openWindow();
		}
	}