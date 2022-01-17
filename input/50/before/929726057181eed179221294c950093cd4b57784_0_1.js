function(file, row) {
		this.img.css({top: top(row), left: left(file), width: blockSize + 'px'})
			.fadeIn(anim);
	}