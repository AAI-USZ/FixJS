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

	if(playerCurrentVolume.down) {

		e.preventDefault();

		playerCurrentVolume.down = false;

	}

	if(playerSeekbarCurrent.down) {

		e.preventDefault();

		playerSeekbarCurrent.down = false;

		var cl = Number(playerSeekbarCurrent.style.left.replace("px",""));

		var n = cl/115;

		if ((chrome?playerPlayer.duration:playerCurrentDuration) !== 0) {

					playerPlayer.currentTime = (chrome?playerPlayer.duration:playerCurrentDuration) * n;

		}		

	}

}