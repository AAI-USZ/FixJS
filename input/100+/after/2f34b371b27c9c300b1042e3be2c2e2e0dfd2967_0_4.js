function documentMouseMove(e) {

	if(e.target == playerHeader || e.target == playerSettingsHeader){

		e.preventDefault();

	}

	if(playerHeader.down) {

		var cr = Number(playerDiv.style.right.replace("px",""))

		var cb = Number(playerDiv.style.bottom.replace("px",""))

		playerDiv.style.right = (cr + playerHeader.oldx - e.clientX) + "px";

		playerDiv.style.bottom = (cb + playerHeader.oldy - e.clientY) + "px";

		playerHeader.oldx = e.clientX;

		playerHeader.oldy = e.clientY;

	}

	if(playerSettingsHeader.down){

		var cr = Number(playerSettings.style.right.replace("px",""))

		var ct = Number(playerSettings.style.top.replace("px",""))

		playerSettings.style.right = (cr + (playerSettingsHeader.oldx - e.clientX)) + "px";

		playerSettings.style.top = (ct - (playerSettingsHeader.oldy - e.clientY)) + "px";

		playerSettingsHeader.oldx = e.clientX;

		playerSettingsHeader.oldy = e.clientY;

	}

	if(playerCurrentVolume.down) {

		var cl = Number(playerCurrentVolume.style.left.replace("px",""));

		var nl = (cl - (playerCurrentVolume.oldx - e.clientX));

		if(nl < 0 || nl > 55) return;

		playerPlayer.volume = nl/55;

		playerCurrentVolume.style.left = nl + "px";

		playerCurrentVolume.oldx = e.clientX;

	}

	

	if(playerSeekbarCurrent.down) {

		var cl = Number(playerSeekbarCurrent.style.left.replace("px",""));

		var nl = (cl - (playerSeekbarCurrent.oldx - e.clientX));

		if(nl < 0 || nl > 120) return;

		playerSeekbarCurrent.style.left = nl + "px";

		playerSeekbarCurrent.oldx = e.clientX;

	}

}