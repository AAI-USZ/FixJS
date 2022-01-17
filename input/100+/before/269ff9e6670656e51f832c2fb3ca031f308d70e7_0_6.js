function(msg){
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
			}