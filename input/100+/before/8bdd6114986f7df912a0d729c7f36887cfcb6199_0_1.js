function _draw(sel, data) {		
		if(!data) return;
		
		var tstr, css = {};

		if(data._p.controls) {
			css = {
				top: data.y + data._p.hgt * (1 - data.scaley),
				left: data.x + data._p.wid * (1 - data.scalex),
				width: data._p.cwid,
				height: data._p.chgt,
			}

			if(data.angle) {
				tstr = _matrixToCSS(Matrix().rotate(data._p.rad));

				css.transform = tstr;
				css["-webkit-transform"] = tstr
				css["-moz-transform"] = tstr;
				css["-o-transform"] = tstr;
				css["-ms-transform"] = tstr;
				css["transform-origin"] = data['rot-origin'];
				css["-webkit-transform-origin"] = data['rot-origin'];
				css["-moz-transform-origin"] = data['rot-origin'];
				css["-o-transform-origin"] = data['rot-origin'];
				css["-ms-transform-origin"] = data['rot-origin'];
			}

			data._p.divs.controls.css(css);

			css = {
				top: -20,
				left: data._p.cwid + 4,
			}

			if(data.angle) {
				tstr = _matrixToCSS(Matrix().rotate(-data._p.rad));
				css.transform = tstr;
				css["-webkit-transform"] = tstr
				css["-moz-transform"] = tstr;
				css["-o-transform"] = tstr;
				css["-ms-transform"] = tstr;
			}

			data._p.divs.rotator.css(css);
		}
		
		css = {};

		var t = (data.y + data._p.hgt * (1 - data.scaley) / 2) >> 0
		l = (data.x + data._p.wid * (1 - data.scalex) / 2) >> 0,
		c = false;

		// need to move y?
		if(t != data._p.prev.top) { c = true; css.top = t };
		
		// need to move x?
		if(l != data._p.prev.left) { c = true; css.left = l};

		// store current pos
		data._p.prev.top = t;
		data._p.prev.left = l;

		// we need a transform
		if( data.angle || data.scalex != 1 || data.scaley != 1 ) {
			c = true;
			
			var mat = Matrix();

			if(data.angle) mat = mat.rotate(data._p.rad, _getRotationPoint(sel));
			if(data.scalex != 1 || data.scaley != 1) mat = mat.scale(data.scalex, data.scaley);

			tstr = _matrixToCSS(mat)
			css.transform = tstr;
			css["-webkit-transform"] = tstr
			css["-moz-transform"] = tstr;
			css["-o-transform"] = tstr;
			css["-ms-transform"] = tstr;
		}

		if(c) sel.css(css)
	}