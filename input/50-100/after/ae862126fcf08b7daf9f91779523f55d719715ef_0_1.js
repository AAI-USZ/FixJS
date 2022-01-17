function breathe(fn) {
		var t = jq.now(), dt = t - _t0;
		if (!(zk.android && zk.chrome) && dt > 2500) { //huge page (the shorter the longer to load; but no loading icon)
			_t0 = t;
			dt >>= 6;
			setTimeout(fn, dt < 10 ? dt: 10); //breathe
				//IE optimize the display if delay is too short
			return true;
		}
	}