function (sound, i) {
		setTimeout(function () {
			//playSound(sound);
			makeDiv(i, sound);
		}, 100 * i);
	}