function (p) {
		p = isFinite(p) ? p : 0;
		tilesetProgress.val(p);
		if (p === 0) {
			tilesetProgress.css({visibility: 'visible'});
		} else if (p === 1) {
			tilesetProgress.css({visibility: 'hidden'});
		}
	}