function () {
		var now = new Date().getTime();
		App.programController.stepForward(now, App.programStatus, App.player.canStepThroughPlaylist());
		App.playProgram(now);
	}