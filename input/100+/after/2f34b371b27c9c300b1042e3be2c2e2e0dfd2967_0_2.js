function documentMouseDown(e) {

	if(playerListItemMenu.parentNode && (e.target.parentNode != playerListItemMenu)){

		playerListItemMenu.parentNode.removeChild(playerListItemMenu);

	}

	if(e.target == playerTitle || e.target==playerTime || e.target==playerHeader){

		e.preventDefault();

		playerHeader.down = true;

		playerHeader.oldx = e.clientX;

		playerHeader.oldy = e.clientY;

	}else if(e.target == playerSettingsHeader){

		e.preventDefault();

		playerSettingsHeader.down = true;

		playerSettingsHeader.oldx = e.clientX;

		playerSettingsHeader.oldy = e.clientY;

	}else if(e.target == playerCurrentVolume) {

		e.preventDefault();

		playerCurrentVolume.down = true;

		playerCurrentVolume.oldx = e.clientX;

	}else if(e.target == playerSeekbarCurrent) {

		e.preventDefault();

		playerSeekbarCurrent.down = true;

		playerSeekbarCurrent.oldx = e.clientX;

	}

}