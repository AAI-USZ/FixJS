function (dg, pointer, evt) {
		var c = dg.control.$n('c'),
			ignore = zk.mobile ? true : jq(c).hasClass('z-errbox-close-over'); // ignore drag to whole close div for mobile to close errorbox easily
		return evt.domTarget == c && ignore;
	}