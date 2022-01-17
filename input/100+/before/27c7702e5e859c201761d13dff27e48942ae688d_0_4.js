function () {
		var t = this;
		t.checkWindow();
		if (t.w !== t.lw || t.h !== t.lh) {t.resize();}
		t.setInvertedCameraPos();

		if (t.debug) {
			var newSize = subset(window,'innerHeight,innerWidth,outerWidth,outerHeight');
			newSize.bodyHeight = document.body.style.height;
			clearDebug();
			displayDebug(newSize);
		}

		t.c.clearRect(0,0,t.w,t.h);
		t.c.save();
		//c.strokeStyle = '#fff';
		t.c.translate(t.cx, t.cy);
		t.rQ.sort(t.sortByObjectZDepth);

		for (t.cro = 0; t.cro < t.rQ.length; t.cro += 1) {
			t.rQ[t.cro].update(t);
		}

		t.c.restore();
	}