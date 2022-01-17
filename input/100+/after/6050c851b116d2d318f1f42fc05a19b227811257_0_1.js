function(/*Controller*/controller, animate) {
		
		if (CB.Plugins._.include(CB.stackOfControllers, controller)) {
			var aIndex = CB.Plugins._.indexOf(CB.stackOfControllers, controller);
			CB.stackOfControllers.splice(aIndex, 1);
		}

		var previous = (CB.stackOfControllers.length == 0) ? null : CB.stackOfControllers[CB.stackOfControllers.length - 1];
		CB.stackOfControllers.push(controller);

		controller.view.top = 0;
		
		var animationTop = 0;
		var animationLeft = CB.mainView.left - CB.screenWidth;
		
		//remove existing view at first
		for (var viewIndex in CB.mainView.children) {
			if (CB.mainView.children[viewIndex].name == controller.view.name) {
				var currChildren = CB.mainView.children.length;
				CB.mainView.remove(CB.mainView.children[viewIndex]);
				if(currChildren > 1){
					CB.mainView.children[viewIndex] = null;
				}
			}
		}

		if (animate === 'none') {
			controller.view.left = 0;
			CB.mainView.add(controller.view);
			
			controller.base.viewWillAppear(controller);

			if (previous !== null) {
				CB.mainView.remove(previous.view);
				previous.base.viewWillDisappear(controller);
			}
			controller.base.viewDidAppear(controller);

			return;
		} else if (animate === 'right') {
			CB.mainView.layouting(function() {
				CB.mainView.width = CB.screenWidth * 2;
				CB.mainView.left = -CB.screenWidth;

				controller.view.left = 0;
				controller.view.top = 0;

				CB.mainView.add(controller.view);
				//CB.mainWindow.add(CB.mainOverlay);

				if (previous !== null) {
					previous.view.left = CB.screenWidth;
					previous.base.viewWillDisappear(controller);
				}
				controller.base.viewWillAppear(controller);
			});
			animationLeft = CB.mainView.left + CB.screenWidth;
		} else if (animate === 'up') {
			CB.mainView.layouting(function() {
				CB.mainView.height = CB.screenHeight * 2;
				CB.mainView.top = -CB.screenHeight;

				controller.view.left = 0;

				CB.mainView.add(controller.view);
				//CB.mainWindow.add(CB.mainOverlay);

				if (previous !== null) {
					previous.view.top = CB.screenHeight;
					previous.base.viewWillDisappear(controller);
				}
				controller.base.viewWillAppear(controller);
			});
			animationLeft = 0;
			animationTop = CB.mainView.top + CB.screenHeight;
		} else if (animate === 'down') {
			CB.mainView.layouting(function() {
				CB.mainView.height = CB.screenHeight * 2;
				controller.view.top = CB.screenHeight;

				controller.view.left = 0;

				CB.mainView.add(controller.view);
				//CB.mainWindow.add(CB.mainOverlay);

				if (previous !== null) {
					previous.base.viewWillDisappear(controller);
				}
				controller.base.viewWillAppear(controller);
			});
			animationLeft = 0;
			animationTop = CB.mainView.top - CB.screenHeight;
		} else {
			CB.mainView.layouting(function() {
				CB.mainView.width = CB.screenWidth * 2;
				controller.view.left = CB.screenWidth;

				CB.mainView.add(controller.view);
				//CB.mainWindow.add(CB.mainOverlay);

				if (previous !== null) {
					previous.base.viewWillDisappear(controller);
				}
				controller.base.viewWillAppear(controller);
			});
		}
		
		CB.mainView.animate({
			duration : CB.__changeControllerDuration,
			left : animationLeft,
			top : animationTop,
		}, function() {
			CB.mainView.layouting(function() {
				//CB.mainWindow.remove(CB.mainOverlay);

				CB.mainView.left = 0;
				CB.mainView.top = 0;
				CB.mainView.width = CB.screenWidth;
				CB.mainView.height = CB.screenHeight;

				controller.view.left = 0;
				controller.view.top = 0;

				if (previous !== null) {
					CB.mainView.remove(previous.view);
					previous.base.viewWillDisappear(controller);
				}
				controller.base.viewDidAppear(controller);
			});
		});

	}