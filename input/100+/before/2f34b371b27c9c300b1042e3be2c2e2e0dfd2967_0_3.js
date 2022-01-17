function documentMouseUp(e) {

	if(playerHeader.down){

		e.preventDefault();

		playerHeader.down = false;

		putInsidePage();

	}

	if(playerSettingsHeader.down) {

		e.preventDefault();

		playerSettingsHeader.down = false;

	}

}