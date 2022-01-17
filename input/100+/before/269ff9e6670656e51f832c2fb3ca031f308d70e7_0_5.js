function(msg) {
		var m = msg.match(/^SEEK_PENDING (\d+) C4 (STD|POP) (\d+)x(\d+)$/);
		var matched = false;
		if (m){
			var seek = {id:+m[1],variant:m[2],board_width:+m[3],board_height:+m[4]};
			C4.add_my_seek(seek);
			C4.status("Waiting for another player");
			matched = true;
		} else {
			m = msg.match(/^DUPLICATE_SEEK (\d+)$/);
			if (m) 
				matched = true;
		}
		if (matched) {
			C4.remove_handler(C4.cb_seek_reply);
			return true;
		} else
			return false;
	}