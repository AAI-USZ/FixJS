function() {
				var
					pgnDiv = $(this),
					game = new Game(tds);
					game.populateBoard(); // later use FEN, maybe
					game.analyzePgn(pgnDiv.text());
					game.gotoBoard(0);
					wrapperDiv.data({currentGame: game});
				if (selector) 
					selector.append($('<option>', {value: game, text:game.description()}));
				else
					game.show();
			}