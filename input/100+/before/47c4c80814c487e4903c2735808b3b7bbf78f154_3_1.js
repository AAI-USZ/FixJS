function extend(r, s, px, sx) {
	if (! s || ! r) {
		return;
	}

	var OP = Object.prototype;
	var O = function (o) {
		function F() {}
		F.prototype = o;
		return new F();
	}
	var sp = s.prototype;
	var rp = O(sp);
	r.prototype = rp;
	rp.constructor = r;
	r.superclass = s;

    // assign constructor property
    if (s !== Object && sp.constructor === OP.constructor) {
        sp.constructor = s;
    }

    // add prototype overrides
    if (px) {
        mix(rp, px, true);
    }

    // add object overrides
    if (sx) {
        mix(r, sx, true);
    }

    return r;
}