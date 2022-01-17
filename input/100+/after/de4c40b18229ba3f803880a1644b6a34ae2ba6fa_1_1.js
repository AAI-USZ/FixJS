function() {

var paths = [
	'woody_1.ogg',
	'woody_2.ogg',
	'woody_3.ogg',
	'woody_4.ogg',
	'woody_5.ogg',
];

var makeDiv = function (i, sound) {
	var div = document.createElement('div');
	div.className = 'key';
	div.style.backgroundColor = '#ff00'+(18*(1+i));
	div.addEventListener('click', function () {
		playSound(sound);
	});
	document.body.appendChild(div);
};

var addKeys = function (sounds) {
	document.addEventListener('keydown', function (e) {
		var key = e.keyCode - 48;
		if (key > 0 && key < 6) {
			playSound(sounds[key-1]);
		}
	});

	var p = document.createElement('p');
	p.innerHTML = 'Click to play<br />or use the numbers keys from 1 - 5.'
	document.body.appendChild(p);
};

var ready = function (sounds) {
	sounds.forEach(function (sound, i) {
		setTimeout(function () {
			playSound(sound);
			makeDiv(i, sound);
		}, 100 * i);
	});

	setTimeout(function () {
		addKeys(sounds);
	}, 100 * sounds.length);
};

var requests = loadSounds(paths, ready);

}