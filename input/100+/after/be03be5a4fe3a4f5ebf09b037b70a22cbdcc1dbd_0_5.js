function(msg) {
		var newGame = msg.match(/^GAME (\d+) C4 (STD|POP) (\d+)x(\d+) (Y|O) (1|2) (NEW|BOARD (.+))$/);
		if (newGame) {
			var gameId = newGame[1];
			C4.gameId = C4.padId(gameId);
			C4.gameVar = newGame[2];
			var w = +newGame[3];
			var h = +newGame[4];
			C4.turn = newGame[5];
			C4.gameStatus(C4.turn == "Y" ? "Your move" : "Waiting for move");
			C4.color = +newGame[6];
			C4.otherColor = 3-C4.color;
			C4.otherConnected = true;
			$(".you-are img").attr({src: "images/piece"+C4.color+"_small.png"});
			
			C4.board = new C4Board({cols:w,rows:h,board:C4.boardEl});
			C4.board.render();
			C4.clear_seeks();
			
			var boardSpec = newGame[8];
			if (boardSpec){
				var rows = boardSpec.replace(/^{{|}}$/g,"").split(/},{/);
				for(var r=1;r<=rows.length;++r){
					var cols = rows[r-1].split(/,/);
					for(var c=1;c<=cols.length;++c){
						var piece = cols[c-1];
						C4.board.setpiece(c, r, piece);
						C4.board.updateCell(c,r);
					}
				}
			}
			
			var re_other_dropped = new RegExp("^OTHER_PLAYED "+gameId+" DROP (\\d+)$");
			var re_other_dropped_won = new RegExp("^OTHER_WON "+gameId+" DROP (\\d+)$");
			var re_other_draw = new RegExp("^OTHER_DRAW "+gameId+" DROP (\\d+)$");
			var re_other_quit = new RegExp("^OTHER_QUIT "+gameId+"$");
			var re_other_disconnected = new RegExp("^OTHER_DISCONNECTED "+gameId+"$");
			var re_other_returned = new RegExp("^OTHER_RETURNED "+gameId+"$");
			var re_you_dropped = new RegExp("^PLAY_OK "+gameId+" DROP (\\d+)$");
			var re_you_win = new RegExp("^YOU_WIN "+gameId+" DROP (\\d+)$");
			var re_draw = new RegExp("^DRAW "+gameId+" DROP (\\d+)$");
			var re_invalid_move = new RegExp("^INVALID_MOVE "+gameId+"$");
			var re_leaving_game = new RegExp("^LEAVING_GAME "+gameId+"$");
			
			var in_game_handler  = function(){}; // init in 2 steps to remove Eclipse warning. argh.
			in_game_handler = function(msg){
				var m;
				if (msg.match(re_leaving_game)){
					C4.gameId = null;
					C4.remove_handler(in_game_handler);
					return true;
				}
				if (m = msg.match(re_you_dropped)) {
					var col = +m[1];
					C4.board.drop(col,C4.color);
					C4.gameStatus("Waiting for move");
					C4.turn = "O";
					return true;
				}
				if (m = msg.match(re_you_win)) {
					var col = +m[1];
					C4.board.drop(col,C4.color);
					C4.gameId = null;
					C4.gameStatus("You won!!");
					return true;
				}
				if (m = msg.match(re_draw)) {
					var col = +m[1];
					C4.board.drop(col,C4.color);
					C4.gameId = null;
					C4.gameStatus("It is a draw");
					return true;
				}
				if (m = msg.match(re_other_draw)) {
					var col = +m[1];
					C4.board.drop(col,C4.otherColor);
					C4.gameId = null;
					C4.gameStatus("It is a draw");
					return true;
				}
				if (m = msg.match(re_other_dropped)) {
					var col = +m[1];
					C4.board.drop(col, C4.otherColor);
					C4.gameStatus("Your move");
					C4.turn = "Y";
					return true;
				}
				if (m = msg.match(re_other_dropped_won)) { 
					var col = +m[1];
					C4.board.drop(col, C4.otherColor);
					C4.gameStatus("You have lost");
					C4.remove_handler(in_game_handler);
					C4.turn = "Y";
					C4.gameId = null;
					return true;
				}
				if (m = msg.match(re_other_no_moves)) {
					var col = +m[1];
					C4.board.drop(col,C4.otherColor);
					C4.gameId = null;
					C4.gameStatus("No more moves");
					return true;
				}
				if (m = msg.match(re_other_quit)) {
					C4.gameStatus("Other player quit");
					C4.remove_handler(in_game_handler);
					C4.gameId = null;
					C4.turn = null;
					return true;
				}
				if (m = msg.match(re_other_disconnected)) {
					C4.gameStatus("Other disconnected");
					C4.otherConnected = false;
					return true;
				}
				if (m = msg.match(re_other_returned)) {
					C4.gameStatus(C4.turn == "Y" ? "Your move" : "Waiting for move");
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