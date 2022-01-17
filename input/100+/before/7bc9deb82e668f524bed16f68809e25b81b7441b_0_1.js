function() {	
		for (var i = 0; i < 1000; i++) {
			var col = r(0x7f);
			col = ((col + r(0xf)) << 16) | ((col + r(0xf)) << 8) | (col + r(0xf));
			p[i] = {
				x: r(w),
				y: r(h),
				r: r(50),
				c: col, //r(0xffffff),
				dx: rz(10) - 5,
				dy: rz(10) - 5
			}
		}
	}