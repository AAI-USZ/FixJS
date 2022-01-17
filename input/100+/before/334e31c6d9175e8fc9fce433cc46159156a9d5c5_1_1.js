function(jqXHR, textStatus){
		var msg = null;
		if (jqXHR.status == 416) {
			if (source == 'next') {
				msg = {
					type : 'info',
					content : 'board_reach_last'
				};
			} else if (source == 'prev') {
				msg = {
					type : 'info',
					content : 'board_reach_first'
				};
			}
			view_board(board_name, -1, -1, callback_func);
		} else {
			var msg = {
				type : 'error',
				content : 'network_error'
			};
		}
		UI_notify_update(msg);
	}