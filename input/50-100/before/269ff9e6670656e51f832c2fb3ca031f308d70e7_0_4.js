function(msg) {
		var m;
		var found = false;
		if(m = msg.match(/^SEEK_CANCELED (\d+)$/)){
			C4.status(msg);
			var seekId = +m[1];
			C4.remove_my_seek(seekId);
			found = true;
		} else if(msg.match(/^NO_SEEK_FOUND (\d+)$/)){
			C4.status(msg);
			found =  true;
		};
		// TODO: Resolve race condition with quick multiple seek cancelation, maybe multiple handlers
		// In the future protocol will match by unique command id.
		if (found)
			C4.remove_handler(C4.cb_cancel_seek);
		return found;
	}