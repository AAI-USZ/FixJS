function (sounds) {
	var p = document.createElement('p');
	p.innerHTML = 'errors: ' + requests.errors.length;
	document.body.appendChild(p);


	sounds.forEach(function (sound, i) {
		setTimeout(function () {
			playSound(sound);
			makeDiv(i, sound);
		}, 100 * i);
	});

	setTimeout(function () {
		addKeys(sounds);
	}, 100 * sounds.length);
}