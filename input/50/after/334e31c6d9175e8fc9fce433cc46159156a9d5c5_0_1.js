function(){

		UI_set_loading();

		view_board($(this).attr('board-name'), -1, -1, UI_update, 'click');

	}