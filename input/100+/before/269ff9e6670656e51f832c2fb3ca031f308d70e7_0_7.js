function(msg) {
		var newGame = msg.match(/^GAME (\d+) C4 (STD|POP) (\d+)x(\d+) (Y|O) (1|2) NEW$/);
		if (newGame) {
			var gameId = newGame[1];
			C4.gameId = C4.padId(gameId);
			C4.gameVar = newGame[2];
			var w = +newGame[3];
			var h = +newGame[4];
			C4.turn = newGame[5];
			C4.status(C4.turn == "Y" ? "New game : Your turn!" : "New game : Wait for opponent to play");
			C4.color = +newGame[6];
			C4.otherColor = 3-C4.color;
			C4.otherConnected = true;
			C4.remove_handler(C4.cb_new_game);
			
			C4.board = new C4Board({cols:w,rows:h,board:C4.boardEl});
			C4.board.render();
			C4.clear_seeks();
			
			var re_other_dropped = new RegExp("^OTHER_PLAYED "+gameId+" DROP (\\d)$");
			var re_other_dropped_won = new RegExp("^OTHER_WON "+gameId+" DROP (\\d)$");
			var re_other_no_moves = new RegExp("^OTHER_NO_MOVES "+gameId+" DROP (\\d+)$");
			var re_other_quit = new RegExp("^OTHER_QUIT "+gameId+"$");
			var re_other_disconnected = new RegExp("^OTHER_DISCONNECTED "+gameId+"$");
			var re_other_returned = new RegExp("^OTHER_RETURNED "+gameId+"$");
			var re_you_dropped = new RegExp("^PLAY_OK "+gameId+" DROP (\\d+)$");
			var re_you_win = new RegExp("^YOU_WIN "+gameId+" DROP (\\d+)$");
			var re_no_moves = new RegExp("^NO_MOVES "+gameId+" DROP (\\d+)$");
			var re_invalid_move = new RegExp("^INVALID_MOVE "+gameId+"$");
			
			var in_game_handler  = function(){}; // init in 2 steps to remove Eclipse warning. argh.
			in_game_handler = function(msg){
				var m;
				if (m = msg.match(re_you_dropped)) {
					var col = +m[1];
					C4.board.drop(col,C4.color);
					C4.turn = "O";
					return true;
				}
				if (m = msg.match(re_you_win)) {
					var col = +m[1];
					C4.board.drop(col,C4.color);
					C4.gameId = null;
					C4.status("You win!!");
					return true;
				}
				if (m = msg.match(re_no_moves)) {
					var col = +m[1];
					C4.board.drop(col,C4.color);
					C4.gameId = null;
					C4.status("No more moves, game over");
					return true;
				}
				if (m = msg.match(re_other_dropped)) {
					var col = +m[1];
					C4.board.drop(col, C4.otherColor);
					C4.status("Your turn");
					C4.turn = "Y";
					return true;
				}
				if (m = msg.match(re_other_dropped_won)) { 
					var col = +m[1];
					C4.board.drop(col, C4.otherColor);
					C4.status("Sorry, you have lost");
					C4.remove_handler(in_game_handler);
					C4.turn = "Y";
					return true;
				}
				if (m = msg.match(re_other_no_moves)) {
					var col = +m[1];
					C4.board.drop(col,C4.otherColor);
					C4.gameId = null;
					C4.status("No more moves, game over");
					return true;
				}
				if (m = msg.match(re_other_quit)) {
					C4.status("Your opponent quit the game");
					C4.remove_handler(in_game_handler);
					C4.gameId = null;
					C4.turn = null;
					return true;
				}
				if (m = msg.match(re_other_disconnected)) {
					C4.status("Other player disconnected, waiting for reconnection");
					C4.otherConnected = false;
					return true;
				}
				if (m = msg.match(re_other_returned)) {
					C4.status("Other player returned!");
					C4.otherConnected = true;
					return true;
				}
				if (m = msg.match(re_invalid_move)) {
					C4.status("Invalid move");
					return true;
				}
				return false;
			};
			C4.add_handler(in_game_handler);
			$.mobile.changePage($("#game"), {changeHash:false});
			return true;
		} else
			return false;
	}