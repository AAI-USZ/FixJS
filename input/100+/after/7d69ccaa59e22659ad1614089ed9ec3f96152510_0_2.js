function(event) {
		var that = this;
		var stage = this.controller.getActiveStageController();
		if (event.command === 'cmdLogout') {
			DBHelper.instance().remove('authInfo', {
				onSuccess: function() {
					Global.authInfo = null;
					setTimeout(function() {
						AppLauncher.onOpenAPP();
					},
					10);
					that.clearMain();
				}
			});
			DBHelper.instance().remove('config');
		} else if (event.command === 'cmdAbout') {
			stage.pushScene('about');
		} else if (event.command === 'cmdToggleBackground') {
			Global.toggleBackground();
		} else if (event.command === 'cmdToggleAlertSound') {
			Global.toggleAlertSound();
		} else if (event.command === 'cmdBack') {
			//why this dunt work?
			//var backEvent = Mojo.Event.make(Mojo.Event.back);
			//stage.sendEventToCommanders(backEvent);
			//and i try this
			if (stage.getScenes().length > 0 && stage.activeScene() != stage.getScenes()[0]) {
				stage.popScene();
			} else {
				//and why this not work too? what the fuck
				stage.deactivate();
			}
		}
	}