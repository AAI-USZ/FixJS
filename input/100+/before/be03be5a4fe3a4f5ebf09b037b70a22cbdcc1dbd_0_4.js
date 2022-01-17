function(msg){
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
				if (m = msg.match(re_no_moves)) {
					var col = +m[1];
					C4.board.drop(col,C4.color);
					C4.gameId = null;
					C4.gameStatus("No more moves");
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
			}