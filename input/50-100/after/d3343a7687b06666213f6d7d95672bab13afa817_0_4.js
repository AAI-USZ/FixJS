function () {
		var t = this;
		t.interval = setInterval(function () {t.update();}, 1000 / t.frameRate);
	}