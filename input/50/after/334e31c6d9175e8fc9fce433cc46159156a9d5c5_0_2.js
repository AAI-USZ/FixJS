function(){

		UI_set_loading();

		var pathTerm = bbs_path.getLastTermWithType(bbs_type.path.board);

		view_board(pathTerm.name, -1, -1, UI_update, 'click', -1);

	}