function(modeName) {

		currentMode = modeName;

		gs.clearCollisionMap();

		modes[modeName].init();

	}