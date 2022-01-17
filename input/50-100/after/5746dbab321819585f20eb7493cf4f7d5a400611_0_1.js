function (msg, type, pid, ref, pos, off, dur) {
		var notif = (zul && zul.wgt) ? zul.wgt.Notification : null; // in zul
		if (notif) {
			// B60-ZK-1205
			// Delay the showing of notification to avoid being closed accidentally
			// by autodisable mechanism
			setTimeout(function() {
				notif.show(msg, pid, {ref:ref, pos:pos, off:off, dur:dur, type:type});
			}, 100);
		} else {
			// TODO: provide a hook to customize
			jq.alert(msg); // fall back to alert when zul is not available
		}
	}