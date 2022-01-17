function _draw(sel) {
		var data = sel.data('freetrans');
		
		if(!data) return;
		
		var divs = data.divs,
		ctrls = divs.controls,
		rot = divs.rotator,
		radian = data.angle * rad,
		x = data.x,
		y = data.y,
		sx = data.scalex,
		sy = data.scaley,
		ror = data['rot-origin'];
		mat = Matrix().rotate(radian, _getRotationPoint(sel)).scale(sx, sy),
		tstr = _matrixToCSS(Matrix().rotate(radian));

		ctrls.css({
			top: y + sel.height() * (1 - sy),
			left: x + sel.width() * (1 - sx),
			width: sel.width() * sx,
			height: sel.height() * sy,
			"transform": tstr,
			"-webkit-transform": tstr,
			"-moz-transform": tstr,
			"-o-transform": tstr,
			"-ms-transform": tstr,
			"transform-origin": ror,
			"-webkit-transform-origin": ror,
			"-moz-transform-origin": ror,
			"-o-transform-origin": ror,
			"-ms-transform-origin": ror
		});
		
		tstr = _matrixToCSS(Matrix().rotate(-radian));
		
		rot.css({
			top: -20,
			left: ctrls.width() + 4,
			"transform": tstr,
			"-webkit-transform": tstr,
			"-moz-transform": tstr,
			"-o-transform": tstr,
			"-ms-transform": tstr
		});
		
		tstr = _matrixToCSS(mat);
		
		// rotate and position
		sel.css({
			position: 'absolute',
			top: y + sel.height() * (1 - sy) / 2,
			left: x + sel.width() * (1 - sx) / 2,
			"transform": tstr,
			"-webkit-transform": tstr,
			"-moz-transform": tstr,
			"-o-transform": tstr,
			"-ms-transform": tstr
		});
	}