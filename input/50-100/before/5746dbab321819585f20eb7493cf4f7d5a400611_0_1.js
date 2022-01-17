function (msg, type, pid, ref, pos, off, dur) {
		var notif = (zul && zul.wgt) ? zul.wgt.Notification : null; // in zul
		if (notif)
			notif.show(msg, pid, {ref:ref, pos:pos, off:off, dur:dur, type:type});
		else {
			// TODO: provide a hook to customize
			jq.alert(msg); // fall back to alert when zul is not available
		}
	}